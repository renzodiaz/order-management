require 'rails_helper'

RSpec.describe "Api::V1::Orders", type: :request do
  let(:headers) do
    {
      "CONTENT_TYPE" => "application/json",
      "ACCEPT" => "application/json"
    }
  end

  describe "GET /api/v1/orders" do
    before { create_list(:order_list, 15) }

    it "returns paginated orders" do
      get "/api/v1/orders", params: { page: 1, per_page: 10 }, headers: headers

      expect(response).to have_http_status(:ok)

      body = JSON.parse(response.body)

      expect(body["data"].size).to eq(10)
      expect(body["meta"]["pagination"]["total_count"]).to eq(15)
    end

    describe "GET /api/v1/orders/:id" do
      let(:order) { create(:order) }

      it "returns the order" do
        get "/api/v1/orders/#{order.id}", headers: headers

        expect(response).to have_http_status(:ok)

        body = JSON.parse(response.body)
        expect(body["data"]["id"]).to eq(order.id.to_s)
      end

      it "returns 404 when not found" do
        get "/api/v1/orders/999999", headers: headers
        expect(response).to have_http_status(:not_found)
      end
    end

    describe "POST /api/v1/orders" do
      let(:valid_params) do
        {
          order: attributes_for(:order)
        }.to_json
      end

      it "creates an order" do
        expect {
          post "/api/v1/orders", params: valid_params, headers: headers
        }.to change(Order, :count).by(1)

        expect(response).to have_http_status(:created)

        body = JSON.parse(response.body)
        expect(body["data"]["attributes"]["customer_name"]).to be_present
      end

      it "returns 422 with invalid params" do
        post "/api/v1/orders",
             params: { order: { customer_name: nil } }.to_json,
             headers: headers

        expect(response).to have_http_status(:unprocessable_entity)
      end
    end

    describe "PATCH /api/v1/orders/:id" do
      let(:order) { create(:order) }

      it "updates the order" do
        patch "/api/v1/orders/#{order.id}",
              params: { order: { quantity: 10 } }.to_json,
              headers: headers

        expect(response).to have_http_status(:ok)
        expect(order.reload.quantity).to eq(10)
      end
    end

    describe "DELETE /api/v1/orders/:id" do
      let!(:order) { create(:order) }

      it "deletes the order" do
        expect {
          delete "/api/v1/orders/#{order.id}", headers: headers
        }.to change(Order, :count).by(-1)

        expect(response).to have_http_status(:no_content)
      end
    end
  end
end
