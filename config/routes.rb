Rails.application.routes.draw do
  get 'messages/reply'
  namespace :api do
    namespace :v1 do
      post '/login', to: 'auth#login'
      get '/user', to: 'users#show_user'
      resources :users
      resources :groups
      resources :user_groups
      resources :rsvps
      resources :sessions
      resources :conversations
      resources :messages
      resources :invitations
      resources :requests


      mount ActionCable.server => '/cable'

   end
 end

 mount ActionCable.server => '/cable'


end
