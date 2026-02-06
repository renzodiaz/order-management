class OrderSerializer
  include JSONAPI::Serializer

  attributes :id, :customer_name, :customer_email, :product_name, :quantity, :status, :total_price
end
