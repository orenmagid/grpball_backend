class Rsvp < ApplicationRecord
  belongs_to :session, optional: true
  belongs_to :user, optional: true
end
