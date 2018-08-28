class Api::V1::SessionsController < ApplicationController
  before_action :find_session, only: [:show, :update]

   def index
     @sessions = session.all
     render json: @sessions
   end


    def show
      render json: @session, include: ['rsvps']
    end

   def update
     @session.update(session_params)
     if @session.save
       render json: @session, status: :accepted
     else
       render json: { errors: @session.errors.full_messages }, status: :unprocessible_entity
     end
   end

   private

   def session_params
     params.require(:session).permit(:id, :group_id, :date, :expiration_date_time, :start_time, :end_time, :min_players, :location, :status)
   end

   def find_session
     @session = session.find(params[:id])
   end

end

end
