class TwitchstreamsController < ApplicationController
  def index
    twitchstreams = TwitchStream.all
    render json: { twitchstreams: twitchstreams }
  end

end
