class Api::V1::SessionsController < ApplicationController
  before_action :find_session, only: [:show, :update]

   def index
     @sessions = Session.all
     render json: @sessions, include: ['group', 'rsvps']
   end


    def show
      render json: @session, include: ['group', 'rsvps']
    end

    def create
      @session = Session.new(session_params)


      if @session.save
        @session.users << @current_user
        @session.save
        @session.rsvps[0].update(status: "Accepted")
        render json: @session, status: :accepted
      else
        render json: { errors: @session.errors.full_messages }, status: :unprocessible_entity
      end
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
     params.require(:session).permit(:id, :group_id, :date, :expiration_date_time, :min_players, :location, :status)
   end

   def find_session
     @session = session.find(params[:id])
   end

end
