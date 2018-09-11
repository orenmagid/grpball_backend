require 'faker'
require 'geocoder'

# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


oren = User.create(first_name: "Oren", last_name: "Magid", username: "odog", email: "autoimpedicis@gmail.com", password: "test", phone_number: "347-422-7852", location: "Washington, DC", highest_experience: "Pickup", height_in_inches: 72, age: 40)


70.times do
  latitude = rand(30..50)
  longitude = rand(-123.75583..-80.01197)
  address = Geocoder.search([latitude, longitude]).first.address

  User.create(first_name: Faker::Name.first_name, last_name: Faker::Name.last_name, username: Faker::Internet.username, email: Faker::Internet.email, password: "test", phone_number: Faker::PhoneNumber.cell_phone, latitude: latitude, longitude: longitude, location: address, highest_experience: "Pickup", height_in_inches: Faker::Number.between(50, 80), age: Faker::Number.between(14, 60))
end

25.times do
  latitude = rand(30..50)
  longitude = rand(-123.75583..-80.01197)
  address = Geocoder.search([latitude, longitude]).first.address

  Group.create(name: Faker::Company.name, latitude: latitude, longitude: longitude, location: address)


end




x = 1
5.times  do
  y = 1
  5.times do
    User.find(x).groups << Group.find(y)
      y += 1
  end
  x += 1
end

x = 6
5.times  do
  y = 6
  5.times do
    User.find(x).groups << Group.find(y)
      y += 1
  end
  x += 1
end

x = 11
5.times  do
  y = 11
  5.times do
    User.find(x).groups << Group.find(y)
      y += 1
  end
  x += 1
end

x = 16
5.times  do
  y = 16
  5.times do
    User.find(x).groups << Group.find(y)
      y += 1
  end
  x += 1
end

x = 21
5.times  do
  y = 21
  5.times do
    User.find(x).groups << Group.find(y)
      y += 1
  end
  x += 1
end



Group.all.each do |group|
  if group.user_groups.length > 0
    group.user_groups.first.update(is_administrator: true)
  end

  conversation = Conversation.create(title: "#{group.name}", group_id: group.id)
  message = Message.create(text: "Hi, I'm Oren. This is my final project for the Flatiron School's Bootcamp. There are no messages in this conversation yet. Get the conversation started!", user_id: 1)
  conversation.messages << message
  conversation.save
  group.conversation = conversation
  group.save
end



x = 1

while x <=  20  do
  latitude = rand(30..50)
  longitude = rand(-123.75583..-80.01197)
  address = Geocoder.search([latitude, longitude]).first.address

  group = Group.find(x)
  Session.create(group_id: x, creator_id: groups.users[0], date: Time.now + x.days, expiration_date_time: Time.now + (x-1).days, min_players: 6, latitude: latitude, longitude: longitude, location: address, status: "Pending")
  x += 1

end

x = 1

while x <  6  do
  y = 1
    while y < 16 do
      session = Session.find(y)
      group = session.group

        Rsvp.create(user_id: group.users[x], session_id: y, status: "Accepted")
        Rsvp.create(user_id: group.users[x + 7], session_id: y, status: "Declined")
        y += 1
    end

  x += 1
end

while x <  6  do
  y = 1
    while y < 3 do
      session = Session.find(y)
        group = session.group

        Rsvp.create(user_id: group.users[x + 7], session_id: y, status: "Delayed")
        y += 1
    end

  x += 1
end



Group.all.each do |group|
  x = 30
  5.times do
    user = User.find(x)

      Request.create(user_id: user.id, group_id: group.id, status: "New")



  end

end
