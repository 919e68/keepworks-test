module Types
  class UserType < Types::BaseObject
    field :id, ID, null: true
    field :email, String, null: true
    field :fullname, String, null: true
    field :gender, String, null: true
  end
end
