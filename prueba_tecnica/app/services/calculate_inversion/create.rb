# frozen_string_literal: true

module CalculateInversion
  class Create
    attr_reader :initial_value

    def initialize(params)
      @initial_value = params['usd'].to_f
      # @monthly_return = monthly_return.to_f
      # @coin_value = coin_value.to_f
    end

    def perform
      coins_value = ::Coins::List.new.perform
      {
        BTC: calculate_annual_profit(5, coins_value[:BTC]['rate']),
        ADA: calculate_annual_profit(1, coins_value[:ADA]['rate']),
        ETH: calculate_annual_profit(4.2, coins_value[:ETH]['rate'])
      }
    end

    def calculate_annual_profit(monthly_return, coin_value)
      return 0 if coin_value.nil?

      one_year = (1 + monthly_return)**12 - 1
      inversion_total = @initial_value + (@initial_value * one_year)
      ganancia_anual = (inversion_total / coin_value) - @initial_value
      ganancia_anual.round(2)
    end
  end
end
