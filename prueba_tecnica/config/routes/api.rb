# frozen_string_literal: true

namespace :api do
  namespace :v1 do
    resources :coins, only: [:index]
    resources :calculates, only: [:create]
  end
end
