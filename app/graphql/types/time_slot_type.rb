module Types
  class TimeSlotType < Types::BaseObject
    field :id, ID, null: true
    field :name, String, null: true
    field :start_time, String, null: true
    def start_time
      object.start_time.strftime("%H:%M:%S")
    end

    field :end_time, String, null: true
    def end_time
      object.end_time.strftime("%H:%M:%S")
    end
  end
end
