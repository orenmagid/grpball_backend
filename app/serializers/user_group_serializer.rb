class UserGroupSerializer < ActiveModel::Serializer

  attributes :id, :user_id, :group_id, :is_administrator, :created_at
  belongs_to :user
  belongs_to :group
  
end
