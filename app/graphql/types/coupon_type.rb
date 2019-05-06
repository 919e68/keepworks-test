module Types
  class CouponType < Types::BaseObject
    field :id, ID, null: true
    field :coupon_code, String, null: true
    field :discount_type, String, null: true
    field :discount, Float, null: true
  end
end
