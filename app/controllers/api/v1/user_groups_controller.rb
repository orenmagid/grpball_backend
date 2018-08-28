class Api::V1::UserGroupsController < ApplicationController

  before_action :find_user_group, only: [:show, :update]

   def index
     @user_groups = UserGroup.all
     render json: @user_groups
   end


    def show
      render json: @user_group
    end

   def update
     @user_group.update(user_group_params)
     if @user_group.save
       render json: @user_group, status: :accepted
     else
       render json: { errors: @user_group.errors.full_messages }, status: :unprocessible_entity
     end
   end

   private

   def user_group_params
     params.require(:user_group).permit(:id, :user_id, :group_id)
   end

   def find_user_group
     @user_group = UserGroup.find(params[:id])
   end

end
