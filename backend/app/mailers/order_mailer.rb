class OrderMailer < ApplicationMailer

  def order_confirmation
    @order = params[:order]
    mail(to: @order.customer_email, subject: "Thank you for your order!")
  end
end
