class LocationsController < ApplicationController

    def create
        location = Location.create_with(lat: params[:lat].to_f, long: params[:long].to_f).find_or_create_by(name: params[:name])
        render json: location
    end

    def destroy
        Location.destroy(params[:id])
    end
end
