class YoutubeStream < ApplicationRecord

  def self.get_data

    videoIdRequest = JSON.parse(RestClient::Request.execute(method: :get, url: "https://www.googleapis.com/youtube/v3/search?&eventType=live&type=video&regionCode=US&order=viewcount&maxResults=7&fields=items(id)&part=snippet&key=#{ENV['ytkey']}"))

    videoIdArray = []
    youtubeJSON = {"items"=>[]}



    7.times do |idcount|
      videoIdArray.push(videoIdRequest["items"][idcount]['id']['videoId'])
    end


    7.times do |count|
      youtubestats = JSON.parse(RestClient::Request.execute(method: :get, url: "https://www.googleapis.com/youtube/v3/videos/?id=#{videoIdArray[count]}&fields=items(id,snippet(channelId,title,channelTitle,thumbnails(medium)),statistics)&part=snippet,statistics&key=#{ENV['ytkey']}"))
      youtubeJSON['items'][count] = youtubestats['items'][0]
    end


    7.times do |count|
      streamer_id = youtubeJSON['items'][count]['snippet']['channelId']
      channel_name = youtubeJSON['items'][count]['snippet']['channelTitle']
      viewers = youtubeJSON['items'][count]['statistics']['viewCount']
      # followers = data['streams'][count]['channel']['followers']
      # total_views = data['streams'][count]['channel']['views']
      # game = data['streams'][count]['channel']['game']
      url = youtubeJSON['items'][count]['id']
      logo = youtubeJSON['items'][count]['snippet']['thumbnails']['medium']['url']

    YoutubeStream.find_or_initialize_by(:streamer_id => streamer_id, :channel_name => channel_name, :url => url).update_attributes!(:viewers => viewers, :logo => logo)
    end

    return youtubeJSON

  end

end
