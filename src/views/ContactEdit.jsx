import React, { Component } from 'react'
import { contactService } from '../services/contact.service'
import {useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { useForm } from '../customHooks/useForm'
import { useDispatch } from 'react-redux'
import { saveContact } from '../store/actions/contact.actions'

export function ContactEdit(props){
    const [contact, handleChange, setContact] = useForm(contactService.getEmptyContact())


    const params = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(()=>{
        loadContact()
    },[])

    async function loadContact() {
        const contactId = params.id
        if (contactId) {
            try {
                const contact = await contactService.getContactById(contactId)
                setContact(contact)
            } catch (error) {
                console.log('error:', error)
            }
        }
    }

    async function onSaveContact(ev) {
        ev.preventDefault()
        try {
            // await contactService.saveContact({ ...contact })
            dispatch(saveContact(contact))
            if (contact._id) navigate(`/contact/${contact._id}`)
            else navigate('/contact')
        } catch (error) {
            console.log('error:', error)
        }
    }

    function onBack(){
        if (contact._id) navigate(`/contact/${contact._id}`)
        else navigate(`/contact`)
    }


        const { name, email, phone, age } = contact
        return (
            <div className='contact-edit-container'>
                <div class="contact-edit">
                    <div class="images">
                        <img src={`https://robohash.org/${contact._id}?set=set5`} />  </div>
                    <div class="product">
                        <p>{contact._id ? 'Edit' : 'Add'} Contact</p>
                        <form onSubmit={onSaveContact} >
                            <div className='group'>
                                <input value={name} onChange={handleChange} type="text" name="name" id="name" />
                                <span class="highlight"></span>
                                <span class="bar"></span>
                                <label htmlFor="name">Name</label>
                            </div>

                            <div className='group'>
                                <input value={email} onChange={handleChange} type="text" name="email" id="email" />
                                <span class="highlight"></span>
                                <span class="bar"></span>
                                <label htmlFor="email">Email</label>
                            </div>

                            <div className='group'>
                                <input value={phone} onChange={handleChange} type="text" name="phone" id="phone" />
                                <span class="highlight"></span>
                                <span class="bar"></span>
                                <label htmlFor="phone">Phone</label>
                            </div>

                            <div className='group'>
                                <input value={age} onChange={handleChange} type="number" name="age" id="age" />
                                <span class="highlight"></span>
                                <span class="bar"></span>
                                <label htmlFor="age">Age</label>
                            </div>

                            <div class="buttons">
                                <button type='submit' class="save">Save</button>
                                <button onClick={onBack} class="back">{(contact._id)? 'Back to Details' : 'Back to List'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
}
