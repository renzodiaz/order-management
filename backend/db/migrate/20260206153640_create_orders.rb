class CreateOrders < ActiveRecord::Migration[7.2]
  def change
    create_table :orders do |t|
      t.string :customer_name
      t.string :customer_email
      t.string :product_name
      t.integer :quantity, default: 1
      t.decimal :total_price, precision: 8, scale: 2

      t.timestamps
    end

    # Index for faster lookups by email (filtering/searching by customer)
    add_index :orders, :customer_email

    # Index for sorting by date (most common sort - newest first)
    add_index :orders, :created_at

    # Composite index for customer order history (orders by specific customer, sorted by date)
    add_index :orders, [ :customer_email, :created_at ]

    # Index for date range queries (orders within a date range)
    add_index :orders, :updated_at
  end
end
