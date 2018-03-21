class TwitchStream < ApplicationRecord

  def insert_twitch_data
    TwitchStream.find_or_initialize_by(:streamer_id => 777777, :channel_name => "bobbyplays", :url => "https://www.twitch.tv/bobbyplays").update_attributes!(:viewers => 212312392, :followers=>1123100, :total_views => 10213120, :game => "PUBG", :logo => "newlogo", :likes => 100123132)
  end

end
