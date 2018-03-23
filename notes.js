// Im going to store some notes here:

// Api call to twitch using gem 'rest-client':
response = RestClient::Request.execute(method: :get, url: 'https://api.twitch.tv/kraken/streams/?limit=10',
                            headers: {'Client-ID': ENV['client_id'], 'Client-Secret': ENV['client_secret']})



// ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
// TESTING INSERTIONS:
// ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
//test create for TopStreams_development:
TwitchStream.create(streamer_id: '51496027', channel_name: 'loltyler1', viewers: '22892', followers: '1524858', total_views: '58567491', game: 'League of Legends', url: 'https://www.twitch.tv/loltyler1', logo: 'https://static-cdn.jtvnw.net/jtv_user_pictures/f3591dbe4ee3d94b-profile_image-300x300.png', likes: 0)

//test a find_or_initialize_by then update based on existence method:
TwitchStream.find_or_initialize_by(:streamer_id => 51496027).update_attributes!(:viewers => 22892)

//Test of checking and not updating certain fields USE THIS ONE FOR ALL INSERTION:
TwitchStream.find_or_initialize_by(:streamer_id => 100000, :channel_name => "thecaveman114", :url => "https://www.twitch.tv/thecaveman114").update_attributes!(:viewers => 22892, :followers=>100, :total_views => 100, :game => "PUBG", :logo => "newlogo", :likes => 10)


// ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
// PARSING DATA AND MAKING INSERTIONS IN RUBY:
// ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

// grabbing data from twtich api in rails c:
twitchAPICall = RestClient::Request.execute(method: :get, url: 'https://api.twitch.tv/kraken/streams/?limit=10',headers: {'Client-ID': ENV['client_id'], 'Client-Secret': ENV['client_secret']})

data = JSON.parse(twitchAPICall)

data['streams'].each do |child|
    puts child
end

//getting each piece of data (writing out all queries):
streamer_id = data['streams'][0]['channel']['_id']
channel_name = data['streams'][0]['channel']['display_name']
viewers = data['streams'][0]['viewers']
followers = data['streams'][0]['channel']['followers']
total_views = data['streams'][0]['channel']['views']
game = data['streams'][0]['channel']['game']
url = data['streams'][0]['channel']['url']
logo = data['streams'][0]['channel']['logo']





//testing insertions within a loop: (this works, it omits likes, that needs to be handled elsewhere on front end with a put/post)
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




//   class TwitchData
//     def get_data
//       data = JSON.parse(RestClient::Request.execute(method: :get, url: 'https://api.twitch.tv/kraken/streams/?limit=10',headers: {'Client-ID': ENV['client_id'], 'Client-Secret': ENV['client_secret']}))
//
//       3.times do |count|
//         streamer_id = data['streams'][count]['channel']['_id']
//         channel_name = data['streams'][count]['channel']['display_name']
//         viewers = data['streams'][count]['viewers']
//         followers = data['streams'][count]['channel']['followers']
//         total_views = data['streams'][count]['channel']['views']
//         game = data['streams'][count]['channel']['game']
//         url = data['streams'][count]['channel']['url']
//         logo = data['streams'][count]['channel']['logo']
//
//       TwitchStream.find_or_initialize_by(:streamer_id => streamer_id, :channel_name => channel_name, :url => url).update_attributes!(:viewers => viewers, :followers => followers, :total_views => total_views, :game => game, :logo => logo)
//       end
//     end
