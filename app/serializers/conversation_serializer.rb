class ConversationSerializer < ActiveModel::Serializer
  attributes :id, :title, :created_at, :updated_at
  has_many :messages
  has_many :users, though: :messages
  belongs_to :group
end
