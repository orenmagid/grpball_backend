class UserGroupSerializer < ActiveModel::Serializer
  belongs_to :user
  belongs_to :group
  attributes :id, :user_id, :group_id, :is_administrator
end
