class Group < ApplicationRecord
  has_many :usergroups
  has_many :users, through: :user_groups
  has_many :sessions
end
