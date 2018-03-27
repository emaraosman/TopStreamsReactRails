class YoutubestreamsController < ApplicationController

  def index
    yd = YoutubeStream.get_data()

    render json: {youtubedata: yd}
    # youtubestreams = YoutubeStream.all

  end

end
