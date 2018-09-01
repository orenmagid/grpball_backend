class Session < ApplicationRecord
  belongs_to :group, optional: true
  has_many :rsvps
  has_many :users, through: :rsvps

  validates_presence_of :group_id, :location, :date, :expiration_date_time, :min_players

  include StreamRails::Activity
  as_activity

    def activity_actor
      self.group
    end

    def activity_object
      self
    end

    def activity_verb
      "proposed a session"
    end

    def activity_extra_data
      @extra_data
    end

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
