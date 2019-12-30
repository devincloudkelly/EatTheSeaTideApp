Rails.application.routes.draw do
  # resources :user_locations
  get '/tides' => 'user_locations#index'
  # resources :locations
  # resources :users
    get '/' => 'users#index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
