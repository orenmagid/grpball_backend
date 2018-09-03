class Rsvp < ApplicationRecord
  belongs_to :session, optional: true
  belongs_to :user, optional: true


  include StreamRails::Activity
  as_activity

    def activity_actor
      self.user
    end

    def activity_object
      self.session
    end

    def activity_verb
      "rsvp'd"
    end



    def activity_notify
      self.session.group.users.map do |user|
        StreamRails.feed_manager.get_notification_feed(user.id)
      end
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
