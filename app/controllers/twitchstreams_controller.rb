class TwitchstreamsController < ApplicationController

  def index
    twitchstreams = TwitchStream.all
    render json: { twitchstreams: twitchstreams }
  end

  # def index
  #   response = RestClient::Request.execute(method: :get, url: 'https://api.twitch.tv/kraken/streams/?limit=10',
  #     headers: {'Client-ID': ENV['client_id'], 'Client-Secret': ENV['client_secret']})
  #   render json: response
  # end

end
