class User < ApplicationRecord
  has_many :user_groups
  has_many :groups, through: :user_groups
  has_many :rsvps

  has_secure_password





end
