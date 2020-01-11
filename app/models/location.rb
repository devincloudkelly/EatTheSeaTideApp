class Location < ApplicationRecord
    has_many :user_locations, dependent: :destroy
    has_many :users, through: :user_locations
end
