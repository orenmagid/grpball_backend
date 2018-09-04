require 'nexmo'

class Api::V1::UsersController < ApplicationController

  before_action :find_user, only: [:show, :update]
  skip_before_action :authenticate, only: [:create]

   def index
     @users = User.all
     render json: @users
   end

    def show
      render json: @current_user, include: ['groups', 'user_groups', 'sessions']
    end


    def show_user
      render json: @current_user, include: ['groups', 'user_groups', 'sessions']
    end

    def create
    @user = User.new(user_params)
    if @user.save
      token = encode({user_id: @user.id})
      render json: { token: token, status: :accepted, success: true, user: @user }
      # render json: @user, status: :accepted
    else
      render json: { errors: @user.errors.full_messages }, status: :unprocessible_entity
    end
  end

   def update
     @current_user.update(user_params)
     if @current_user.save


       # client = Nexmo::Client.new(
       #   api_key: ENV['NEXMO_API_KEY'],
       #   api_secret: ENV['NEXMO_API_SECRET']
       # )
       # response = client.sms.send(
       #   from: '12015542314',
       #   to: '12024243653',
       #   text: 'This is from Oren. Did it work?'
       # )


       render json: @current_user, status: :accepted
     else
       render json: { errors: @current_user.errors.full_messages }, status: :unprocessible_entity
     end
   end

   private

   def user_params
     params.require(:user).permit(:id, :first_name, :last_name, :username, :email, :password, :phone_number, :location, :age, :height_in_inches, :highest_experience)
   end

   def find_user
     @current_user = User.find(params[:id])
   end
end
