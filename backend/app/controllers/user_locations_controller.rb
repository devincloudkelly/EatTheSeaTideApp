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
        tides_object = params[:tides]
        new_tides = []
        tides_object.each do |tide|
            new_tide = UserLocation.create(sea_level: (tide["height"] * 3.2808), state: tide['state'], datetime: tide['datetime'], user_id: params[:user_id], location_id: params[:loc_id]) 
            new_tides << new_tide
        end
        byebug
        render json: new_tides
        # tide = UserLocation.create(sea_level: params[:sea_level], state: params[:state], datetime: params[:datetime], user_id: params[:user_id], location_id: params[:location_id])
        # render json: tide
    end

end
