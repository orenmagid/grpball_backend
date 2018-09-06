class RsvpSerializer < ActiveModel::Serializer

  attributes :id, :user_id, :session_id, :status, :other_text, :did_show
  belongs_to :session
  belongs_to :user
end
