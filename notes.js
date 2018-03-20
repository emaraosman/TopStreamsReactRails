// Im going to store some notes here:

// Api call to twitch using gem 'rest-client':
response = RestClient::Request.execute(method: :get, url: 'https://api.twitch.tv/kraken/streams/?limit=10',
                            headers: {'Client-ID': ENV['client_id'], 'Client-Secret': ENV['client_secret']})
