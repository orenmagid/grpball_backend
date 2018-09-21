class CreateUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :users do |t|
      t.string :first_name
      t.string :last_name
      t.string :username, null: false
      t.string :email, null: false
      t.string :password_digest, null: false
      t.string :phone_number
      t.string :location
      t.decimal :latitude
      t.decimal :longitude
      t.integer :age
      t.integer :height_in_inches
      t.string :highest_experience

      t.timestamps
    end
  end
end
