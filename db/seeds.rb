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
  User.create(first_name: Faker::Name.first_name, last_name: Faker::Name.last_name, username: Faker::Internet.username, email: Faker::Internet.email, password: "test", phone_number: Faker::PhoneNumber, location: Faker::Address.city, highest_experience: "Pickup", height_in_inches: Faker::Number.between(50, 80), age: Faker::Number.between(14, 60))
end

5.times do
  Group.create(name: Faker::Company.name, location: Faker::Address.city)
end


x = 1
while x <  16  do
  User.find(x).groups << Group.find(1)
  User.find(x).groups << Group.find(2)
  User.find(x).groups << Group.find(3)

  x += 1
end
