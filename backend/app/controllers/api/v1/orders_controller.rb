module Api::V1
  class OrdersController < ApplicationController
    def index
      orders = Order.page(params[:page] || 1)
                    .per(params[:per_page] || 10)
      render json: serialize(orders)
    end

    def stats
      total_orders = Order.count
      pending_orders = Order.where(status: 0).count
      delivered_orders = Order.where(status: 1).count
      payload = [
        { name: "Total Orders", value: total_orders },
        { name: "Pending Orders", value: pending_orders },
        { name: "Delivered Orders", value: delivered_orders }
      ]
      render json: payload
    end

    def show
      render json: serialize(order)
    end

    def create
      if order.save
        render json: serialize(order), status: :created
      else
        unprocessable_entity!(order)
      end
    end

    def update
      if order.update(order_params)
        render json: serialize(order), status: :ok
      else
        unprocessable_entity!(order)
      end
    end

    def destroy
      order.destroy
      render status: :no_content
    end

    private

    def order
      @order ||= params[:id] ? Order.find_by!(id: params[:id])
                   : Order.new(order_params)
    end

    def order_params
      params.require(:order)
            .permit(:customer_name, :customer_email, :product_name, :quantity, :total_price)
    end
  end
end
