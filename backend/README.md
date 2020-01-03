# README

Description

This app is intended to allow users to enter a location (coordinates and name) and a desired tide height, and it will populate favorable tides for that location for the upcoming week. 

Instructions

- Fork and clone this repository
- run 'bundle install'
- launch rails server with 'rails s'
- open the index page from your terminal with 'open frontend/index.html'
- Search tides at your favorite placess


## Challenges

- passing data through url in get request to persist data.
- adding data persistence after the fact
- passing several params(pass objects next time)
- concurrency in databases. (max threads, dynos, workers, timeouts)
- migrating from sqlite3 to PostgreSQL