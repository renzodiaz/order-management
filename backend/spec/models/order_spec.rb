require 'rails_helper'

RSpec.describe Order, type: :model do
  # Validations
  describe "validations" do
    it { should validate_presence_of(:customer_name) }
    it { should validate_presence_of(:customer_email) }
    it { should validate_presence_of(:product_name) }
    it { should validate_presence_of(:quantity) }
    it { should validate_presence_of(:total_price) }

    # Email format validation
    it { should allow_value('user@example.com').for(:customer_email) }
    it { should allow_value('test.user+tag@domain.co.uk').for(:customer_email) }
    it { should_not allow_value('invalid').for(:customer_email) }
    it { should_not allow_value('invalid@').for(:customer_email) }
    it { should_not allow_value('@example.com').for(:customer_email) }

    # Numericality validations
    it { should validate_numericality_of(:quantity).is_greater_than(0) }
    it { should validate_numericality_of(:total_price).is_greater_than_or_equal_to(0) }
  end

  describe "callbacks" do
    describe "after_create" do
      it "sends an email confirmation" do
        order = build(:order)

        expect {
          order.save
        }.to have_enqueued_job(ActionMailer::MailDeliveryJob)
               .with(
                 'OrderMailer',
                 'order_confirmation',
                 'deliver_now',
                 hash_including(params: { order: order})
               )
      end
    end
  end

  # Factory validation
  describe "factory" do
    it "has a valid factory" do
      expect(build(:order)).to be_valid
    end
  end
end
