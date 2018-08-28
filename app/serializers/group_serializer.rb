class GroupSerializer < ActiveModel::Serializer
  has_many :usergroups
  has_many :users, through: :usergroups
  attributes :id, :name, :location
end
