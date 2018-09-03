require 'faker'

# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


oren = User.create(first_name: "Oren", last_name: "Magid", username: "odog", email: "autoimpedicis@gmail.com", password: "test", phone_number: "347-422-7852", location: "Washington, DC", highest_experience: "Pickup", height_in_inches: 72, age: 40)


15.times do
  User.create(first_name: Faker::Name.first_name, last_name: Faker::Name.last_name, username: Faker::Internet.username, email: Faker::Internet.email, password: "test", phone_number: Faker::PhoneNumber.cell_phone, location: Faker::Address.city, highest_experience: "Pickup", height_in_inches: Faker::Number.between(50, 80), age: Faker::Number.between(14, 60))
end

10.times do
  Group.create(name: Faker::Company.name, location: Faker::Address.city)
end


x = 1
while x <  16  do
  User.find(x).groups << Group.find(1)
  User.find(x).groups << Group.find(2)
  User.find(x).groups << Group.find(3)
  User.find(x).groups << Group.find(4)
  User.find(x).groups << Group.find(5)

  x += 1
end

UserGroup.find(4).update(is_administrator: true)

x = 1
while x <  10  do
  Session.create(group_id: x, creator_id: x, date: "2018-09-13 18:15:00", expiration_date_time: "2018-09-05 18:00:00", min_players: 6, location: Faker::Address.city, status: "Pending")
  x += 1
end

x = 1
while x <  6  do
  Rsvp.create(user_id: x, session_id: 1, status: "Accepted")
  Rsvp.create(user_id: x, session_id: 2, status: "Accepted")
  Rsvp.create(user_id: x, session_id: 3, status: "Accepted")
  Rsvp.create(user_id: x, session_id: 4, status: "Accepted")
  Rsvp.create(user_id: x, session_id: 5, status: "Accepted")
  x += 1
end
