class SessionsSerializer < ActiveModel::Serializer
  belongs_to :group
  has_many :rsvps
  attributes :id, :group_id, :date, :expiration_date_time, :start_time, :end_time, :min_players, :location, :status
end
