class TwitchstreamsController < ApplicationController
  def index
    twitchstreams = TwitchStream.all
    render json: { twtichstreams: twitchstreams }
  end
  
end
