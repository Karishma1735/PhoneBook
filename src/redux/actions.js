import { ADD_CONTACT, DELETE_CONTACT, EDIT_CONTACT, SEARCH_USER, TOGGLE_BOOKMARK, UPDATE_CONTACT } from "./actionTypes";

export const addcontacts = (contact)=>({
    type:ADD_CONTACT,
    payload:contact,
})

export const deleteContact = (id)=>({
    type:DELETE_CONTACT,
    payload:id,
})

export const editcontact = (contact)=>({
    type:EDIT_CONTACT,
    payload:contact
})

export const updateContact = (contact)=>({
    type:UPDATE_CONTACT,
    payload:contact
})

export const toggleBookmark = (id)=>({
    type:TOGGLE_BOOKMARK,
    payload:id,
})
export const searchuser =(text)=>({
    type:SEARCH_USER,
    payload:text,
})