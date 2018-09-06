class Api::V1::InvitationsController < ApplicationController

  before_action :find_invitation, only: [:show, :update, :destroy]

   def index
     @invitations = Invitation.all
     render json: @invitations
   end


    def show
      render json: @invitation
    end

   def update
     @invitation.update(invitation_params)
     if @invitation.save
       render json: @invitation, status: :accepted
     else
       render json: { errors: @invitation.errors.full_messages }, status: :unprocessible_entity
     end
   end

   def destroy
    @invitation.destroy


  end

   private

   def invitation_params
     params.require(:invitation).permit(:id, :user_id, :group_id, :status)
   end

   def find_invitation
     @invitation = Invitation.find(params[:id])
   end

end
