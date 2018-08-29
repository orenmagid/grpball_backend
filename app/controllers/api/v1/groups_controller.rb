class Api::V1::GroupsController < ApplicationController

  before_action :find_group, only: [:show, :update]

   def index
     @groups = Group.all
     render json: @groups
   end


    def show
      render json: @group, include: ['users', 'user_groups']
    end

    def create
      @group = Group.new(group_params)
      @user = User.find(params[:user_id])

      if @group.save
        @group.users << @user
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
      if params[:username]
        @group.users << @user
        @group.save
        render json: @group, status: :accepted
      end
    end

   private

   def group_params
     params.require(:group).permit(:id, :name, :location)
   end

   def find_group
     @group = Group.find(params[:id])
   end

end
