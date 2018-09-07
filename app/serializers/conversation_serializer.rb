class ConversationSerializer < ActiveModel::Serializer
  attributes :id, :title, :created_at, :updated_at
  has_many :messages
end
