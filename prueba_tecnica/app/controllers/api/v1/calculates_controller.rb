# frozen_string_literal: true

module Api
  module V1
    class CalculatesController < ApplicationController
      def create
        render json: ::CalculateInversion::Create.new(permitted_attributes).perform
      end

      private

      def permitted_attributes
        params.require(:calculate)
              .permit(:usd)
      end
    end
  end
end
