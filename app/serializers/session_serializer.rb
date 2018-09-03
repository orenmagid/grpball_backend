class SessionSerializer < ActiveModel::Serializer
  belongs_to :group
  has_many :rsvps
  attributes :id, :group_id, :date, :expiration_date_time, :min_players, :location, :status, :creator_id, :latitude, :longitude
end
