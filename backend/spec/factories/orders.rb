FactoryBot.define do
  factory :order do
    customer_name { "John Doe" }
    customer_email { "email@example.com" }
    product_name { "My first product" }
    quantity { 1 }
    total_price { 999 }
  end

  factory :order_list, class: Order do
    customer_name  { Faker::Name.name }
    customer_email { Faker::Internet.email }
    product_name   { Faker::Commerce.product_name }
    quantity       { Faker::Number.between(from: 1, to: 5) }
    total_price    { Faker::Commerce.price(range: 10..200) }
    status         { "pending" }
  end
end
