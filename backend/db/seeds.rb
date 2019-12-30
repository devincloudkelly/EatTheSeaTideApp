# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
user_a = User.create(username: 'dkelly')

location_a = Location.create(name: 'Belfair State Park', lat: 47.429450, long: -122.874630)
location_b = Location.create(name: 'Moclips Beach', lat: 47.221349, long: -124.209901)

user_location_a = UserLocation.create(sea_level: -1.5, state: 'LOW TIDE', datetime: 2019-12-13, user_id: User.all.sample.id, location_id: Location.all.sample.id)