class Order < ApplicationRecord
  enum :status, { pending: 0, shipped: 1, delivered: 2 }

  validates :customer_name, presence: true
  validates :product_name, presence: true
  validates :quantity, presence: true, numericality: { greater_than: 0 }
  validates :total_price, presence: true, numericality: { greater_than_or_equal_to: 0 }
  validates :customer_email, presence: true, format: { with: URI::MailTo::EMAIL_REGEXP }

  before_validation :normalize_email
  after_create_commit :send_order_confirmation_email

  private

  def send_order_confirmation_email
    OrderMailer.with(order: self).order_confirmation.deliver_later
  end

  def normalize_email
    customer_email.downcase! if customer_email
  end
end
