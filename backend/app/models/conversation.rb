class Conversation < ApplicationRecord
  has_many :messages
  belongs_to :group
  has_many :users, through: :messages

end
