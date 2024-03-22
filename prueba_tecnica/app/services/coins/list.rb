# frozen_string_literal: true

module Coins
  class List
    require 'net/http'
    def perform
      {
        BTC: get_coin('BTC'),
        ADA: get_coin('ADA'),
        ETH: get_coin('ETH')
      }
    end

    def get_coin(type_coin)
      url = URI("https://rest.coinapi.io/v1/exchangerate/#{type_coin}/USD")

      https = Net::HTTP.new(url.host, url.port)
      https.use_ssl = true

      request = Net::HTTP::Get.new(url)
      request['Accept'] = 'application/json'
      request['Authorization'] = '55E3B4F6-68DF-4D52-9DD7-C900A057F4B9'

      response = https.request(request)
      JSON.parse response.read_body
    end
  end
end
