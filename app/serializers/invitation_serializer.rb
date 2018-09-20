class InvitationSerializer < ActiveModel::Serializer

  attributes :id, :user_id, :group_id, :status, :created_at, :updated_at
  belongs_to :group
  belongs_to :user

end
