class RequestSerializer < ActiveModel::Serializer
  belongs_to :group
  belongs_to :user

  attributes :id, :user_id, :group_id, :status
end
