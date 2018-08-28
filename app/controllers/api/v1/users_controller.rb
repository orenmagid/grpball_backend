class Api::V1::UsersController < ApplicationController

  before_action :find_user, only: [:show, :update]

   def index
     @users = User.all
     render json: @users
   end

    def show
      render json: @user, include: ['groups', 'user_groups']
    end


    def show_user
      render json: { username: current_user.username, firstName: current_user.first_name, lastName: current_user.last_name, email: current_user.email, phoneNumber: current_user.phone_number, location: current_user.location, highestExperience: current_user.highest_experience}
    end

   def update
     @user.update(user_params)
     if @user.save
       render json: @user, status: :accepted
     else
       render json: { errors: @user.errors.full_messages }, status: :unprocessible_entity
     end
   end

   private

   def user_params
     params.require(:user).permit(:id, :first_name, :last_name, :username, :email, :password_digest, :phone_number, :location, :highest_experience)
   end

   def find_user
     @user = User.find(params[:id])
   end
end
