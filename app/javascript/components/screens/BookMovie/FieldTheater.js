import React from 'react'
import classNames from 'classnames'

const FieldTheater = ({ theaters, selected, disabled, onChange, messages }) => (
  <div className="field">
    <label>Select Theater</label>
    {
      ('theaterId' in messages) && (
        <div className={`message ${messages.theaterId.class}`}>
          {messages.theaterId.message}
        </div>
      )
    }
    <div className="selector">
      {theaters.map(theater => {
        const active = theater.id == selected
        const disableItem = disabled && theater.id != selected

        return (
          <div
            key={`theater-${theater.id}`}
            className={classNames('select-item', { active, disabled: disableItem })}
            onClick={() => !disabled ? onChange(theater.id) : null}
          >
            {theater.name}
          </div>
        )
      })}
    </div>
  </div>

)

export default FieldTheater
