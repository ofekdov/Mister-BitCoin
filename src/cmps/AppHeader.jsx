import { Component } from 'react'
import { NavLink,Link, useNavigate } from 'react-router-dom'

export function AppHeader(props) {  
    return (
        <>
        <section className='app-header flex align-center space-between'>
        <div className='logo flex auto-center'>
            <img src="https://seeklogo.com/images/B/bitcoin-gold-btg-logo-21848512BA-seeklogo.com.png" alt="" />
            <Link to="/"><span>Mr. BIT©oin</span></Link>
            </div>
        <nav>
            <NavLink exact to="/">Home</NavLink>
            <NavLink to="/contact">Contacts</NavLink>
            <NavLink to="/signup">signup</NavLink>
            <NavLink to="/statistic">DashBoard</NavLink>
        </nav>

        </section>
        </>
    )
}
