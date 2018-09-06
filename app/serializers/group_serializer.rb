class GroupSerializer < ActiveModel::Serializer
  has_many :user_groups
  has_many :users, through: :user_groups
  has_many :invitations
  has_many :requests
  attributes :id, :name, :location, :latitude, :longitude
end
