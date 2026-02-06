puts "Seeding orders..."

STATUSES = %w[pending shipped delivered].freeze

50.times do
  quantity = Faker::Number.between(from: 1, to: 5)
  unit_price = Faker::Commerce.price(range: 10.0..200.0)

  Order.create!(
    customer_name: Faker::Name.name,
    customer_email: Faker::Internet.email,
    product_name: Faker::Commerce.product_name,
    quantity: quantity,
    total_price: quantity * unit_price,
    status: STATUSES.sample,
    created_at: Faker::Time.backward(days: 30)
  )
end

puts "Orders seeded"
