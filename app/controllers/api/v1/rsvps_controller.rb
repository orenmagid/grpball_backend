

class Api::V1::RsvpsController < ApplicationController
    before_action :find_rsvp, only: [:show, :update]

  def index
    @rsvps = Rsvp.all
    render json: @rsvps
  end


   def show
     render json: @rsvp, include: ['rsvps']
   end

   def create
     @rsvp = Rsvp.new(rsvp_params)
     @session = Session.find(params[:session_id])
     @num_of_accepted = @session.rsvps.select {|rsvp| rsvp.status == "Accepted"}.length

     if @rsvp.save
       if @session.status != "Confirmed" && @num_of_accepted >= @session.min_players
         @session.update(status: "Confirmed")
       elsif @session.status != "Pending" && @num_of_accepted < @session.min_players
         @session.update(status: "Pending")
       end
       render json: @rsvp, status: :accepted
     else
       render json: { errors: @rsvp.errors.full_messages }, status: :unprocessible_entity
     end
   end

  def update
    @rsvp.update(rsvp_params)
    @session = Session.find(params[:session_id])
    @num_of_accepted = @session.rsvps.select {|rsvp| rsvp.status == "Accepted"}.length

    if @rsvp.save
      if @session.status != "Confirmed" && @num_of_accepted >= @session.min_players
        @session.update(status: "Confirmed")
      elsif @session.status != "Pending" && @num_of_accepted < @session.min_players
        @session.update(status: "Pending")
      end
      render json: @rsvp, status: :accepted
    else
      render json: { errors: @rsvp.errors.full_messages }, status: :unprocessible_entity
    end
  end

  private

  def rsvp_params
    params.require(:rsvp).permit(:id, :user_id, :session_id, :status, :other_text, :did_show)
  end

  def find_rsvp
    @rsvp = Rsvp.find(params[:id])
  end

end
