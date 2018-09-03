class CreateSessions < ActiveRecord::Migration[5.2]
  def change
    create_table :sessions do |t|
      t.integer :group_id
      t.integer :creator_id
      t.datetime :date
      t.datetime :expiration_date_time
      t.integer :min_players
      t.string :location
      t.decimal :latitude
      t.decimal :longitude
      t.string :status


      t.timestamps
    end
  end
end
