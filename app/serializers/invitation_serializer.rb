class InvitationSerializer < ActiveModel::Serializer

  attributes :id, :user_id, :group_id, :status
  belongs_to :group
  belongs_to :user
  
end
