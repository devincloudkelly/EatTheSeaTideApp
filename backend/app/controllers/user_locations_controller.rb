class UserLocationsController < ApplicationController

    def index
        lat = 47.429450
        long = -122.874630
        @tides = UserLocation.api(lat, long)
        render json: @tides
    end

end
