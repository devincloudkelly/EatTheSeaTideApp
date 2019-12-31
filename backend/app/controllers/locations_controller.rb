class LocationsController < ApplicationController

    def create
        location = Location.create(name: params[:locName], lat: params[:lat].to_f, long: params[:long].to_f)
        render json: location
    end
end
