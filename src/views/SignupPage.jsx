import React, { Component } from 'react'
import { userService } from '../services/user.service'
import { connect, useDispatch, useSelector } from 'react-redux'
import { signup } from '../store/actions/user.actions'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

export function SignupPage(props) {

  const user = useSelector((storeState)=> storeState.userModule.loggedInUser) 
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [name, setName] = useState('')

  // state = {
  //   name: ''
  // }

  function handleChange({ target }) {
    let value = target.value
    setName(value)
  }

  function onSignup() {
    dispatch(signup(name))
    navigate('/')
  } 


    return (
      <section className='signup-page'>
        <h2>Please enter your name</h2>
        <input onChange={handleChange} value={name} type="text" name='name'/>
        <button onClick={onSignup}>Sign up</button>
      </section>
    )
}

// const mapStateToProps = state => ({
//   user:state.userModule.loggedInUser
// })

// const mapDispatchToProps = {
//   signup
// }

// export const SignupPage = connect(mapStateToProps, mapDispatchToProps)(_SignupPage)
