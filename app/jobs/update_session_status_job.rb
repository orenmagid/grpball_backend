class UpdateSessionStatusJob < ApplicationJob
  queue_as :default

  def perform(*args)
    Session.all.each do |session|
       if session.expiration_date_time.past? && session.status == "Pending"
         session.update(status: "Cancelled")
         session.save

       end
    end
  end
end
