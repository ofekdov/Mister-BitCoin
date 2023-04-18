import React, { Component } from 'react'
import { contactService } from '../services/contact.service'
import { ContactList } from '../cmps/ContantList'
import { ContactFilter } from '../cmps/ContantFilter'
import { Link } from 'react-router-dom'
import { loadContacts, setFilterBy } from '../store/actions/contact.actions'
import { connect, useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'


export function ContactPage(props) {

  const contacts = useSelector((storeState) => storeState.contactModule.contacts)
  const filterBy = useSelector((storeState) => storeState.contactModule.filterBy)

  const dispatch = useDispatch()

  useEffect(()=> {
    dispatch(loadContacts())
  },[])

  // async function loadContacts() {
  //   const {filterBy} = state
  //   try {
  //     const contacts = await contactService.getContacts(filterBy)
  //     setState({ contacts })
  //   } catch (err) {
  //     console.log('err:', err)
  //   }
  // }

  function onChangeFilter(filterBy) {
    dispatch(setFilterBy(filterBy))
    dispatch(loadContacts())
}

    if (!contacts) return <div>Loading...</div>
    return (
      <section className="contact-index">
                    <>
                        <Link className='add-contact' to="/contact/edit">Add Contact</Link>
                        <ContactFilter filterBy={filterBy} onChangeFilter={onChangeFilter} />
                        <ContactList contacts={contacts}/> 
                    </>               
      </section>
    )
}

