# README

Web App that helps users find favorable tides for fishing, crabbing and clam digging. User inserts the location and desired tide, and receives upcoming favorable tides. 


[![Eat the sea app](http://img.youtube.com/vi/lyN_JWtu3pI/0.jpg)](http://www.youtube.com/watch?v=lyN_JWtu3pI "Eat the Sea App")

# Installing

- Fork and clone this repository
- run 'bundle install'
- launch rails server with 'rails s'
- open the index page from your terminal with 'open frontend/index.html'

# Operating Instructions 

- Search tides at your favorite places to create/read instances of locations and tides (user_locations)
- Delete instances of tides and locations from the page.

To get started, you can use my favotire clamming beach, Belfair State Park:

- Name: Belfair State Park
- Lat: 47.4292
- Long: -122.8746

An ideal tide level for clamming is -1.5 low tide.



## Challenges

- passing data through url in get request to persist data.
- adding data persistence after the fact
- passing several params(pass objects next time)
- concurrency in databases. (max threads, dynos, workers, timeouts)
- migrating from sqlite3 to PostgreSQL