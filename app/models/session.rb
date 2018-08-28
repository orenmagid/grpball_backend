class Session < ApplicationRecord
  belongs_to :group, optional: true
  has_many :rsvps
end
