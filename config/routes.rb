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

 get '/me', to: 'feeds#user'
 get '/notification_user', to: 'feeds#notification_user'
 get '/notification_group/:id', to: 'feeds#notification_group'
 get '/flat', to: 'feeds#flat'
 get '/aggregated', to: 'feeds#aggregated'
 get '/group/:id', to: 'feeds#group'
 mount ActionCable.server => '/cable'
end
