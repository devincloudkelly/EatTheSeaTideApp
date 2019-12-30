class UserLocationsController < ApplicationController

    def index
        lat = params[:lat]
        long = params[:long]
        tides = UserLocation.api(lat, long)
        render json: tides
    end

end
