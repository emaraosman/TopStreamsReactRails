class TwitchStream < ApplicationRecord

    def self.get_data
      data = JSON.parse(RestClient::Request.execute(method: :get, url: 'https://api.twitch.tv/kraken/streams/?limit=10',headers: {'Client-ID': ENV['client_id'], 'Client-Secret': ENV['client_secret']}))

      7.times do |count|
        streamer_id = data['streams'][count]['channel']['_id']
        channel_name = data['streams'][count]['channel']['display_name']
        viewers = data['streams'][count]['viewers']
        followers = data['streams'][count]['channel']['followers']
        total_views = data['streams'][count]['channel']['views']
        game = data['streams'][count]['channel']['game']
        url = data['streams'][count]['channel']['url']
        logo = data['streams'][count]['channel']['logo']

      TwitchStream.find_or_initialize_by(:streamer_id => streamer_id, :channel_name => channel_name, :url => url).update_attributes!(:viewers => viewers, :followers => followers, :total_views => total_views, :game => game, :logo => logo)
      end

      return data #keep this return at the bottom to allow the data to be entered into db first

    end

end
