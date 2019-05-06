class CreateUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :users do |t|
      t.string :fullname, null: false
      t.string :gender, null: false, limit: 10
      t.timestamps
    end
  end
end