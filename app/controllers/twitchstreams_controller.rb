class TwitchstreamsController < ApplicationController
  def index
    @twitchstreams = TwitchStream.all
  end
end
