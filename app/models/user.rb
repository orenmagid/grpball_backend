class User < ApplicationRecord
  has_many :user_groups
  has_many :groups, through: :user_groups
  has_many :rsvps

  validates :username, uniqueness: true
  validates_presence_of :first_name, :last_name, :password

  has_secure_password





end
