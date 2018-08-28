class RsvpsSerializer < ActiveModel::Serializer
  belongs_to :session
  belongs_to :user
  attributes :id, :user_id, :session_id, :status, :other_text, :did_show
end
