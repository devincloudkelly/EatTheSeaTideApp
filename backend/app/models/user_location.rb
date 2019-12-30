class UserLocation < ApplicationRecord
  belongs_to :user
  belongs_to :location

  require 'uri'
  require 'net/http'
  require 'openssl'

  # lat = 47.429450
  # long = -122.874630

  
  def self.api(lat, long)
    url = URI("https://tides.p.rapidapi.com/tides?interval=60&duration=10080&latitude=#{lat}&longitude=#{long}")

    http = Net::HTTP.new(url.host, url.port)
    http.use_ssl = true
    http.verify_mode = OpenSSL::SSL::VERIFY_NONE

    request = Net::HTTP::Get.new(url)
    request["x-rapidapi-host"] = 'tides.p.rapidapi.com'
    request["x-rapidapi-key"] = 'd153400e53msh20cbde97ca23477p1c68eajsn134593973306'

    response = http.request(request)
    return response.read_body
    # puts response
  end

end
