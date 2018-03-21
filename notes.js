// Im going to store some notes here:

// Api call to twitch using gem 'rest-client':
response = RestClient::Request.execute(method: :get, url: 'https://api.twitch.tv/kraken/streams/?limit=10',
                            headers: {'Client-ID': ENV['client_id'], 'Client-Secret': ENV['client_secret']})

//test create for TopStreams_development:
TwitchStream.create(streamer_id: '51496027', channel_name: 'loltyler1', viewers: '22892', followers: '1524858', total_views: '58567491', game: 'League of Legends', url: 'https://www.twitch.tv/loltyler1', logo: 'https://static-cdn.jtvnw.net/jtv_user_pictures/f3591dbe4ee3d94b-profile_image-300x300.png', likes: 0)

//test a find_or_initialize_by then update based on existence method:
TwitchStream.find_or_initialize_by(:streamer_id => 51496027).update_attributes!(:viewers => 22892)

//Test of checking and not updating certain fields:
TwitchStream.find_or_initialize_by(:streamer_id => 100000, :channel_name => "thecaveman114", :url => "https://www.twitch.tv/thecaveman114").update_attributes!(:viewers => 22892, :followers=>100, :total_views => 100, :game => "PUBG", :logo => "newlogo", :likes => 10)


data['streams'].each do |child|
    puts child
end
