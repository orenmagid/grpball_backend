require 'faker'

# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


oren = User.create(first_name: "Oren", last_name: "Magid", username: "odog", email: "autoimpedicis@gmail.com", password: "test", phone_number: "347-422-7852", location: "Washington, DC", highest_experience: "Pickup", height_in_inches: 72, age: 40)


50.times do
  User.create(first_name: Faker::Name.first_name, last_name: Faker::Name.last_name, username: Faker::Internet.username, email: Faker::Internet.email, password: "test", phone_number: Faker::PhoneNumber.cell_phone, location: Faker::Address.full_address, highest_experience: "Pickup", height_in_inches: Faker::Number.between(50, 80), age: Faker::Number.between(14, 60))
end

25.times do
  Group.create(name: Faker::Company.name, location: Faker::Address.full_address)
end




x = 1
while x <  16  do
  while y < 16 do
    User.find(x).groups << Group.find(y)
  end
  x += 1
end


Group.all.each do |group|
  group.user_groups.first.update(is_administrator: true)
end

x = 1
while x <  20  do
  Session.create(group_id: x, creator_id: x, date: x.days.from_now, expiration_date_time: (x-1).days.from_now, min_players: 6, location: Faker::Address.city, status: "Pending")
  x += 1
end

x = 1
while x <  6  do
    while y < 16 do
        Rsvp.create(user_id: x, session_id: y, status: "Accepted")
        Rsvp.create(user_id: x + 7, session_id: y, status: "Declined")
        Rsvp.create(user_id: x + 14, session_id: y, status: "Delayed")
    end


  x += 1
end
