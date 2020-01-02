Rails.application.routes.draw do
  # resources :user_locations
  get '/tides' => 'user_locations#index'
  post '/create' => 'user_locations#create'
  delete '/delete/:id' => 'user_locations#delete'
  # resources :locations
  post '/location' => 'locations#create'
  # resources :users
    get '/' => 'users#index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
