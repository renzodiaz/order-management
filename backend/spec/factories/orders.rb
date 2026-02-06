FactoryBot.define do
  factory :order do
    customer_name { "John Doe" }
    customer_email { "email@example.com" }
    product_name { "My first product" }
    quantity { 1 }
    total_price { 999 }
  end
end
