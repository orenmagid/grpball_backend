require 'pry'

class Api::V1::SessionsController < ApplicationController
  skip_before_action :authenticate, only: [:index]
  before_action :find_session, only: [:show, :update]

   def index
     # Session.update_session_status
     @sessions = Session.all
     render json: @sessions
   end


    def show
      Session.update_session_status
      render json: @session
    end

    def create
      Session.update_session_status
      @session = Session.new(session_params)


      if @session.save


        @session.users << @current_user

        @session.rsvps.last.update(status: "Accepted")

        render json: @session, status: :accepted
      else
        render json: { errors: @session.errors.full_messages }, status: :unprocessible_entity
      end
    end

   def update
     Session.update_session_status
     @session.update(session_params)
     if @session.save
       render json: @session, status: :accepted
     else
       render json: { errors: @session.errors.full_messages }, status: :unprocessible_entity
     end
   end

   private

   def session_params
     params.require(:session).permit(:id, :group_id, :date, :expiration_date_time, :min_players, :location, :status, :creator_id)
   end

   def find_session
     @session = Session.find(params[:id])
   end

end
