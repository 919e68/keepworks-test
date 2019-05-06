class CreateCoupons < ActiveRecord::Migration[5.2]
  def change
    create_table :coupons do |t|
      t.string :coupon_code, null: false, limit: 10
      t.string :discount_type, null: false
      t.decimal :discount, null: false, precision: 10, scale: 2
      t.boolean :is_claimed, default: false
      t.integer :claimed_by
      t.timestamps
    end
  end
end