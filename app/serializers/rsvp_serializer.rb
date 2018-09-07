class RsvpSerializer < ActiveModel::Serializer

  attributes :id, :user_id, :session_id, :status, :other_text, :did_show, :created_at, :updated_at
  belongs_to :session
  belongs_to :user
end
