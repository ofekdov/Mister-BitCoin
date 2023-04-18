import { contactService } from "../../services/contact.service"
import { REMOVE_CONTACT, SET_FILTER_BY, SET_CONTACTS, ADD_CONTACT, UPDATE_CONTACT } from "../reducers/contact.reducer"

export function loadContacts() {
    return async (dispatch, getState) => {
        try {
            const contacts = await contactService.getContacts(getState().contactModule.filterBy)
            const action = {
                type: SET_CONTACTS,
                contacts
            }
            dispatch(action)
        } catch (error) {
            console.log('error:', error)
        }
    }
}

export function removeContact(contactId) {
    return async (dispatch) => {
        try {
            await contactService.deleteContact(contactId)
            const action = { type: REMOVE_CONTACT, contactId }
            dispatch(action)
            return 'Removed!'
        } catch (error) {
            console.log('error:', error)
        }
    }
}

export function saveContact(contact) {
    return async (dispatch) => {
        try {
            const type = contact._id? UPDATE_CONTACT : ADD_CONTACT 
            const newContact = await contactService.saveContact(contact)
            const action = { type, newContact }
            dispatch(action)
            return 'Removed!'
        } catch (error) {
            console.log('error:', error)
        }
    }
}

export function setFilterBy(filterBy) {
    return (dispatch) => {
        dispatch({ type: SET_FILTER_BY, filterBy })
    }
}