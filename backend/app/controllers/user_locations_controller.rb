class UserLocationsController < ApplicationController

    def index
        lat = params[:lat].to_i
        long = params[:long].to_i
        tides = UserLocation.api(lat, long)
        render json: tides
        # byebug
    end

end
