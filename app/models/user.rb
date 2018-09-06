class User < ApplicationRecord
  has_many :user_groups
  has_many :groups, through: :user_groups
  has_many :rsvps
  has_many :sessions, through: :rsvps
  has_many :messages, dependent: :destroy

  validates :username, uniqueness: true
  validates :password, presence: true, :on => :create
  validates_presence_of :first_name, :last_name

  has_secure_password

  geocoded_by :location
  after_validation :geocode





end
