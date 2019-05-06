import React from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

const FieldBookingDate = ({ selected, minDate, maxDate, onChange, disabled, messages }) => {
  return (
    <div className="field">
      <label>Select Date</label>
      {
        ('bookingDate' in messages) && (
          <div className={`message ${messages.bookingDate.class}`}>
            {messages.bookingDate.message}
          </div>
        )
      }
      <div className="input-date">
        <DatePicker
          selected={selected}
          minDate={minDate}
          maxDate={maxDate}
          onChange={onChange}
          disabled={disabled}
          messages={messages}
        />
      </div>
    </div>
  )
}
export default FieldBookingDate