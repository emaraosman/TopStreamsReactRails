#// Im going to store some notes here:

#// Api call to twitch using gem 'rest-client':
response = RestClient::Request.execute(method: :get, url: 'https://api.twitch.tv/kraken/streams/?limit=10',
                            headers: {'Client-ID': ENV['client_id'], 'Client-Secret': ENV['client_secret']})



#{}// ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
#// TESTING INSERTIONS:
#{}// ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
#//test create for TopStreams_development:
TwitchStream.create(streamer_id: '51496027', channel_name: 'loltyler1', viewers: '22892', followers: '1524858', total_views: '58567491', game: 'League of Legends', url: 'https://www.twitch.tv/loltyler1', logo: 'https://static-cdn.jtvnw.net/jtv_user_pictures/f3591dbe4ee3d94b-profile_image-300x300.png', likes: 0)

#//test a find_or_initialize_by then update based on existence method:
TwitchStream.find_or_initialize_by(:streamer_id => 51496027).update_attributes!(:viewers => 22892)

#//Test of checking and not updating certain fields USE THIS ONE FOR ALL INSERTION:
TwitchStream.find_or_initialize_by(:streamer_id => 100000, :channel_name => "thecaveman114", :url => "https://www.twitch.tv/thecaveman114").update_attributes!(:viewers => 22892, :followers=>100, :total_views => 100, :game => "PUBG", :logo => "newlogo", :likes => 10)


#{}// ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
#// PARSING DATA AND MAKING INSERTIONS IN RUBY:
#{}// ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

#// grabbing data from twtich api in rails c:
twitchAPICall = RestClient::Request.execute(method: :get, url: 'https://api.twitch.tv/kraken/streams/?limit=10',headers: {'Client-ID': ENV['client_id'], 'Client-Secret': ENV['client_secret']})

data = JSON.parse(twitchAPICall)

data['streams'].each do |child|
    puts child
end




#//testing insertions within a loop: (this works, it omits likes, that needs to be handled elsewhere on front end with a put/post)
3.times do |count|
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


#Original youtube api call:
https://www.googleapis.com/youtube/v3/search?&key=${process.env.ytkey}&eventType=live&type=video&maxResults=10&order=viewcount&fields=items(id,snippet(channelId,title,channelTitle,thumbnails(medium)))&part=snippet

#1st Youtube api call to get only videoId's for statistics api call:
https://www.googleapis.com/youtube/v3/search?&eventType=live&type=video&regionCode=US&order=viewcount&maxResults=10&key=AIzaSyB6Ll7HUB0WITtsenRtrO_CnJtFRZibKdY&fields=items(id)&part=snippet

#Youtube api call to retrieve view count of each youtube stream.
https://www.googleapis.com/youtube/v3/videos/?id=AkWZ81z-mzg&fields=items(id,snippet(channelId,title,channelTitle,thumbnails(medium)),statistics)&part=snippet,statistics&${process.env.ytkey}


# Ruby request that gets videoIds of top ten:
RestClient::Request.execute(method: :get, url: "https://www.googleapis.com/youtube/v3/search?&eventType=live&type=video&regionCode=US&order=viewcount&maxResults=7&fields=items(id)&part=snippet&key=#{ENV['ytkey']}")

# Ruby request that gets viewcount and all snippet data on each videoID:

RestClient::Request.execute(method: :get, url: "https://www.googleapis.com/youtube/v3/videos/?id=#{videoID}&fields=items(id,snippet(channelId,title,channelTitle,thumbnails(medium)),statistics)&part=snippet,statistics&key=#{ENV['ytkey']}")
