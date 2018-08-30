class Session < ApplicationRecord
  belongs_to :group, optional: true
  has_many :rsvps
  has_many :users, through: :rsvps

  validates_presence_of :group_id
end
