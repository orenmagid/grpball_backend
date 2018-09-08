class MessageSerializer < ActiveModel::Serializer
 attributes :id, :conversation_id, :user_id, :text, :created_at, :updated_at
 belongs_to :conversation
 belongs_to :user
end
