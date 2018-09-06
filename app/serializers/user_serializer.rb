class UserSerializer < ActiveModel::Serializer

  attributes :id, :first_name, :last_name, :username, :email, :phone_number, :location, :highest_experience, :age, :height_in_inches, :latitude, :longitude

  has_many :user_groups
  has_many :groups, through: :user_groups
  has_many :rsvps
  has_many :invitations
  has_many :requests
  
end
