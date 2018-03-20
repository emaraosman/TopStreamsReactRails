class CreateTwitchStreams < ActiveRecord::Migration[5.1]
  def change
    create_table :twitch_streams do |t|
      t.integer :streamer_id
      t.string :channel_name
      t.integer :viewers
      t.integer :followers
      t.integer :total_views
      t.string :game
      t.string :url
      t.string :logo
      t.bigint :likes
      t.timestamps
    end
  end
end
