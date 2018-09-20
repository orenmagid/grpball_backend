class CreateRsvps < ActiveRecord::Migration[5.2]
  def change
    create_table :rsvps do |t|
      t.integer :user_id
      t.integer :session_id
      t.string :status
      t.text :other_text
      t.boolean :did_show, default: false

      t.timestamps
    end
  end
end
