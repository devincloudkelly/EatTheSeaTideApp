class UserLocationsController < ApplicationController

    def index
        lat = params[:lat].to_f
        long = params[:long].to_f
        tides = UserLocation.api(lat, long)
        render json: tides
    end

    def create
        # tideInstances = UserLocation.createMultiple(params[:tides], params[:user_id], params[:loc_id])
        # render json: tideInstances
        tide = UserLocation.create(sea_level: params[:sea_level], state: params[:state], datetime: params[:datetime], user_id: params[:user_id], location_id: params[:location_id])
        render json: tide
    end

end
