module Types
  class TheaterType < Types::BaseObject
    field :id, ID, null: true
    field :name, String, null: true
    field :capacity, Int, null: true
  end
end
