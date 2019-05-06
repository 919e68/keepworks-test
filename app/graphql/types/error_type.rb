module Types
  class ErrorType < Types::BaseObject
    field :type, String, null: false
    field :path, String, null: false
    field :message, String, null: false
  end
end
