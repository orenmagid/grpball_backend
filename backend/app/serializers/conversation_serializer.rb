class ConversationSerializer < ActiveModel::Serializer
  attributes :id, :title, :group_id, :created_at, :updated_at
  has_many :messages
  has_many :users, though: :messages
  belongs_to :group
end
