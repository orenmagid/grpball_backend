class Api::V1::RsvpsController < ApplicationController

  def index
    @rsvps = Rsvp.all
    render json: @rsvps
  end


   def show
     render json: @rsvp, include: ['rsvps']
   end

   def create
     @rsvp = Rsvp.new(rsvp_params)


     if @rsvp.save
       render json: @rsvp, status: :accepted
     else
       render json: { errors: @rsvp.errors.full_messages }, status: :unprocessible_entity
     end
   end

  def update
    @rsvp.update(rsvp_params)
    if @rsvp.save
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
