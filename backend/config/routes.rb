Rails.application.routes.draw do
  # resources :user_locations
  get '/userlocations' => 'user_locations#index'
  post '/userlocations' => 'user_locations#create'
  delete '/userlocations/:id' => 'user_locations#destroy'
  resources :locations
  # post '/locations' => 'locations#create'
  # delete '/locations/:id' => 'locations#destroy'
  # resources :users
    # get '/' => 'users#index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
