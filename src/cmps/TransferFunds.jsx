import React from 'react'
import { useState } from 'react'

export function TransferFunds({contact, maxCoins, onTransferCoins}) {

  const [amount, setAmount] = useState(0)

  function onSetAmount({target}) {
    setAmount(target.value)
  }

  return (
    <section className='transfer-funds'>
    <h3>Transfer Funds</h3>
    <small>To: {contact.name}</small>
    <h5>Available Coins {maxCoins}</h5>
    <input onChange={onSetAmount} type="number" name='amount' placeholder='Send Funds' />
    <button className='send-btn flex auto-center' onClick={()=> onTransferCoins(amount, contact)}><span> Send</span></button>
    </section>
  )
}
