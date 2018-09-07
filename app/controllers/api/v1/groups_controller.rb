class Api::V1::GroupsController < ApplicationController

  skip_before_action :authenticate, only: [:index]
  before_action :find_group, only: [:show, :update]

   def index
     @groups = Group.all
     render json: @groups
   end


    def show
      render json: @group
    end

    def create
      @group = Group.new(group_params)
        @user = User.find(params[:user_id])


      if @group.save
        @group.users << @user
        @group.save
        @group.user_groups.last.update(is_administrator: true)
        render json: @group, status: :accepted
      else
        render json: { errors: @group.errors.full_messages }, status: :unprocessible_entity
      end
    end

    def update
      if params[:user_id]
          @user = User.find(params[:user_id])
      elsif params[:username]
        @user = User.find_by(username: params[:username])
      end

      if params[:name]
        if params[:name] == @group.name
          @group.users << @user
          @group.save
          render json: @group, status: :accepted
        else
          render json: { errors: @group.errors.full_messages }, status: :unprocessible_entity
        end
      end
      if params[:username] || params[:user_id]
        @group.users << @user
        @group.save

        @group.user_groups.last.update(is_administrator: params[:is_administrator])

        render json: @group, status: :accepted
      end
    end

   private

   def group_params
     params.require(:group).permit(:id, :name, :location, :user_id, :is_administrator)
   end

   def find_group
     @group = Group.find(params[:id])
   end

end
