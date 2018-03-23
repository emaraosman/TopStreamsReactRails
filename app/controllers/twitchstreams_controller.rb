class TwitchstreamsController < ApplicationController

  def index
    td = TwitchStream.get_data()

    render json: {twitchdata: td}
    # twitchstreams = TwitchStream.all

  end

  # def index
  #   response = RestClient::Request.execute(method: :get, url: 'https://api.twitch.tv/kraken/streams/?limit=10',
  #     headers: {'Client-ID': ENV['client_id'], 'Client-Secret': ENV['client_secret']})
  #   render json: response
  # end


end
