class Group < ApplicationRecord
  has_many :user_groups
  has_many :users, through: :user_groups
  has_many :sessions
  has_many :invitations
  has_many :requests

  geocoded_by :location
  after_validation :geocode

  # include StreamRails::Activity
  # as_activity
  #
  #   def activity_actor
  #     self.user_groups
  #   end
  #
  #   def activity_object
  #     self.sessions
  #   end
  #
  #   def activity_verb
  #     "proposed"
  #   end

  #   def activity_extra_data
  #     @extra_data
  #   end

    # def activity_extra_data
    #   {'is_retweet' => self.is_retweet}
    # end
    #
    # def activity_should_sync?
    #   self.published
    # end

    #
    # def activity_notify
    #   if self.is_retweet
    #     [StreamRails.feed_manager.get_notification_feed(self.parent.user_id)]
    #   end
    # end

end
