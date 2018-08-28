class Api::V1::GroupsController < ApplicationController

  before_action :find_group, only: [:show, :update]

   def index
     @groups = Group.all
     render json: @groups
   end


    def show
      render json: @group, include: ['users', 'user_groups']
    end

   def update
     @group.update(group_params)
     if @group.save
       render json: @group, status: :accepted
     else
       render json: { errors: @group.errors.full_messages }, status: :unprocessible_entity
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
