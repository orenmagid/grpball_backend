class SessionSerializer < ActiveModel::Serializer

  attributes :id, :group_id, :date, :expiration_date_time, :min_players, :location, :status, :creator_id, :latitude, :longitude, :created_at, :updated_at
  belongs_to :group
  has_many :rsvps

end
