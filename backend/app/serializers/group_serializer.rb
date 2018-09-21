class GroupSerializer < ActiveModel::Serializer

  attributes :id, :name, :location, :latitude, :longitude
  has_many :user_groups
  has_many :users, through: :user_groups
  has_many :invitations
  has_many :requests
  has_one :conversation


end
