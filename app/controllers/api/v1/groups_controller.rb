class Api::V1::GroupsController < ApplicationController

  skip_before_action :authenticate, only: [:index, :show]
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
        @conversation = Conversation.create(title: "#{@group.name}", group_id: @group.id)
        @message = Message.create(text: "Hi, I'm Oren. This is my final project for the Flatiron School's Bootcamp. There are no messages in this conversation yet. Get the conversation started!", user_id: 1)
        @conversation.messages << @message
        @conversation.save


      if @group.save
        @group.users << @user
        @group.conversation = @conversation
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
         if @group.save

           @group.user_groups.last.update(is_administrator: params[:is_administrator])

           render json: @group, status: :accepted
         else
           render json: { errors: @group.errors.full_messages }, status: :unprocessible_entity
        end
      end
    end

   private

   def group_params
     params.require(:group).permit(:id, :name, :location, :user_id, :is_administrator, :latitude, :longitude)
   end

   def find_group
     @group = Group.find(params[:id])
   end

end
