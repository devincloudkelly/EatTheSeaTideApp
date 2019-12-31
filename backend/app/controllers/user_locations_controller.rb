class UserLocationsController < ApplicationController

    def index
        lat = params[:lat].to_f
        long = params[:long].to_f
        tides = UserLocation.api(lat, long)
        render json: tides
    end

    def create
        tide = UserLocation.create(sea_level: params[:sea_level], state: params[:state], datetime: params[:datetime], user_id: params[:user_id], location_id: params[:location_id])
        render json: tide
    end

end
