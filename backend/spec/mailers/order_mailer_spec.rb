require "rails_helper"

RSpec.describe OrderMailer, type: :mailer do
  describe "#order_confirmation" do
    let(:order) { build(:order) }

    let(:mail) do
      OrderMailer
        .with(order: order)
        .order_confirmation
        .deliver_now
    end

    it "sends to the customer's email" do
      expect(mail.to).to eq([ order.customer_email ])
    end

    it "sets the correct subject" do
      expect(mail.subject).to eq("Thank you for your order!")
    end

    it "sets the from address" do
      expect(mail.from).to eq([ "from@example.com" ])
    end

    it "assigns @order" do
      expect(mail.body.encoded).to include(order.product_name)
    end
  end
end
