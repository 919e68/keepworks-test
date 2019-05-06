import React from 'react'
import classNames from 'classnames'
import moment from 'moment'

const FieldTimeSlot = ({ slots, selected, disabled, onChange, messages }) => (
  <div className="field">
    <label>Select Schedule</label>
    {
      ('timeSlotId' in messages) && (
        <div className={`message ${messages.timeSlotId.class}`}>
          {messages.timeSlotId.message}
        </div>
      )
    }
    <div className="selector">
      {slots.map(slot => {
        const active = slot.id == selected
        const disableItem = disabled && slot.id != selected

        return (
          <div
            key={`time-slot-${slot.id}`}
            className={classNames('select-item', { active, disabled: disableItem })}
            onClick={() => !disabled ? onChange(slot.id) : null}
          >
            {moment(slot.startTime, 'HH:mm:ss').format('hh:mm A')}
          </div>
        )
      })}
    </div>
  </div>
)

export default FieldTimeSlot
