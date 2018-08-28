Rails.application.routes.draw do
  namespace :api do
   namespace :v1 do
     post '/login', to: 'auth#login'
     get '/user', to: 'users#show_user'
     resources :users
     resources :groups
     resources :user_groups
     resources :rsvps
     resources :sessions
   end
 end
end
