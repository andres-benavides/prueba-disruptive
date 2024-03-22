# frozen_string_literal: true

module Api
  module V1
    class CoinsController < ApplicationController
      def index
        render json: ::Coins::List.new.perform
      end

      private

      def broadcast_coins(coins)
        WebsocketRails[:coins_channel].trigger(:update, coins)
      end
    end
  end
end
