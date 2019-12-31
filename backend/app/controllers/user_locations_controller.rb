class UserLocationsController < ApplicationController

    def index
        lat = params[:lat].to_f
        long = params[:long].to_f
        tides = UserLocation.api(lat, long)
        render json: tides
        # byebug
    end

end
