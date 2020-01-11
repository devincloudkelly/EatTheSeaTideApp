class User < ApplicationRecord
    has_many :user_locations, dependent: :destroy
    has_many :locations, through: :user_locations
end
