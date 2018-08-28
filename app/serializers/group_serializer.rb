class GroupSerializer < ActiveModel::Serializer
  has_many :user_groups
  has_many :users, through: :user_groups
  attributes :id, :name, :location
end
