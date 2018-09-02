class UserGroup < ApplicationRecord
  belongs_to :user, optional: true
  belongs_to :group, optional: true

  include StreamRails::Activity
  as_activity

    def activity_actor
      self.user
    end

    def activity_object
      self.group
    end

    def activity_verb
      "joined"
    end

    # def activity_extra_data
    #   @extra_data
    # end

    def activity_notify
        [StreamRails.feed_manager.get_notification_feed(self.group_id)]
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
