task :update_session_status => :environment do
  # name of model
  Session.find_each do |session|
     # if session expiration_date_time is in the past
     if session.expiration_date_time < Date.today && session.status == "Pending"
       session.update(status: "Cancelled")
       session.save

     end
  end
end
