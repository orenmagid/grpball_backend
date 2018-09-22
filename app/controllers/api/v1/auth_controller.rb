class Api::V1::AuthController < ApplicationController

  skip_before_action :authenticate, only: [:login]


   def login
     @current_user = User.find_by(username: params[:username])
     if @current_user && @current_user.authenticate(params[:password])

       token = encode({user_id: @current_user.id})
       render json: { token: token, success: true }
     else

       render json: { success: false }, status: 401
     end
   end

end
