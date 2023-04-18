import React, { Component } from 'react'
import { userService } from '../services/user.service'
import { bitcoinService } from '../services/bitcoin.service'
import { connect, useSelector } from 'react-redux'
import MoveList from '../cmps/MoveList'
import { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'


export function HomePage(props) {

  const user = useSelector((storeState)=> storeState.userModule.loggedInUser) 

  const [bitcoinRate, setBitcoinRate] = useState(null)
  // state = {
  //   bitcoinRate: null,
  // }

  const navigate = useNavigate()

  useEffect(()=> {
    if(!user) {
      navigate(`/signup`)
      return
    }
    loadBitcoin()
  }, [])

  async function loadBitcoin() {
    const bitcoinRate = await bitcoinService.getRate(user.coins)
    setBitcoinRate( bitcoinRate)
}
if (!user || !bitcoinRate) {
  return <div>Loading...</div>
}
const moves = user.moves.slice(0,4)
const movesTitle = 'Your last Transfers'
    return (
      <section className='home-page'>
      <div class="btc-badge">
    <div class="card">
      <section className='contact'>
       <h1>Hello {user.name}!</h1>
         <div>Avalible coins ${user.coins}</div>
        <p>Current Bitcoin price</p>
        <h1>${ bitcoinRate }</h1>
        <p>Past 24 hours</p>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 125">
            <path d="M50 30L30 40 10 10v80h80V50L70 60"/>
        </svg>
      </section>
      <section className='moves'>
          <MoveList title={movesTitle} moves={moves}/>
      </section>
    </div>
</div>
      </section>
    )
  }

// const mapStateToProps = state => ({
//   user:state.userModule.loggedInUser
// })

// export const HomePage = connect(mapStateToProps)(_HomePage)
