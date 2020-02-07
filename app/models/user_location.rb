class UserLocation < ApplicationRecord
  belongs_to :user
  belongs_to :location

  require 'uri'
  require 'net/http'
  require 'openssl'

  
  def self.api(lat, long)
    url = URI("https://tides.p.rapidapi.com/tides?interval=60&duration=10080&latitude=#{lat}&longitude=#{long}")

    http = Net::HTTP.new(url.host, url.port)
    http.use_ssl = true
    http.verify_mode = OpenSSL::SSL::VERIFY_NONE

    request = Net::HTTP::Get.new(url)
    request["x-rapidapi-host"] = 'tides.p.rapidapi.com'
    request["x-rapidapi-key"] = ENV['x-rapidapi-key']

    response = http.request(request)
    return response.read_body
    # puts response
  end

  def self.createMultiple(array, user_id, loc_id)
    new_tides_array = []
    array.each do |obj|
      height = obj.height * 3.2808
      tide = UserLocation.create(sea_level: obj.height, state: height, datetime: obj.datetime, user_id: user_id, location_id: loc_id)
      new_tides_array << tide
    end
    return new_tides_array
  end
end
