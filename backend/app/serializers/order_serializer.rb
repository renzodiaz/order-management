class OrderSerializer
  include JSONAPI::Serializer

  attributes :id, :customer_name, :product_name, :quantity, :status, :total_price
end
