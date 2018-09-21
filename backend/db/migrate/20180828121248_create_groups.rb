class CreateGroups < ActiveRecord::Migration[5.2]
  def change
    create_table :groups do |t|
      t.string :name
      t.string :location
      t.decimal :latitude
      t.decimal :longitude

      t.timestamps
    end
  end
end
