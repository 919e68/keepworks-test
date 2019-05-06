import React from 'react'

const FieldCoupon = ({ value, onChange, disabled, messages }) => {
  if (disabled) {
    return null
  }

  return (
    <div className="field coupon">
      <label>Coupon Code <span>(optional)</span></label>
      {
        ('couponCode' in messages) && (
          <div className={`message ${messages.couponCode.class}`}>
            {messages.couponCode.message}
          </div>
        )
      }
      <input
        type="text"
        value={value}
        onChange={onChange}
      />
    </div>
  )
}

export default FieldCoupon
