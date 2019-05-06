module Types
  class MovieType < Types::BaseObject
    field :id, ID, null: true
    field :title, String, null: true
    field :price, Float, null: true

    field :showing_start, String, null: true
    def showing_start
      object[:showing_start].to_date.strftime('%Y-%m-%d')
    end

    field :showing_end, String, null: true
    def showing_end
      object[:showing_end].to_date.strftime('%Y-%m-%d')
    end

    field :can_book, Boolean, null: true
    def can_book
      object[:showing_end].to_date >= DateTime.now.to_date
    end

    field :theaters, [Types::TheaterType], null: true
  end
end
