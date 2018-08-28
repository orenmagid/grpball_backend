class UserSerializer < ActiveModel::Serializer
  has_many :usergroups
  has_many :groups, through: :usergroups
  has_many :RSVPs
  attributes :id, :first_name, :last_name, :username, :email, :password_digest, :phone_number, :location, :highest_experience
end
