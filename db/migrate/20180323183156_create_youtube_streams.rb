class CreateYoutubeStreams < ActiveRecord::Migration[5.1]
  def change
    create_table :youtube_streams do |t|
      t.integer :streamer_id
      t.string :channel_name
      t.integer :viewers
      t.integer :followers
      t.integer :total_views
      t.string :game
      t.string :url
      t.string :logo
      t.bigint :likes
      t.bigint :dislikes
      t.timestamps
    end
  end
end
