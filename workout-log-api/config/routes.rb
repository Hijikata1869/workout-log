Rails.application.routes.draw do
  get "up" => "rails/health#show", as: :rails_health_check

  namespace :api do
    namespace :v1 do
      resource :session, only: %i[create show destroy]
      resource :users, only: %i[create update destroy]
      resources :exercises, only: %i[index create update destroy]
    end
  end
end
