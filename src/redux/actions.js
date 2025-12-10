import axios from "axios";
import { ADD_CONTACT, DELETE_CONTACT, EDIT_CONTACT, FETCH_CONTACT, FILTER_LABEL, SEARCH_USER, TOGGLE_BOOKMARK, UPDATE_CONTACT } from "./actionTypes";
import { baseUrl } from "../../config";

export const addcontacts = (contact) => {
    return async (dispatch) => {
        const res = await axios.post(`${baseUrl}/user`, contact);
        dispatch({
            type: ADD_CONTACT,
            payload: res.data,
        });
        console.log("data submitted",contact);
        
    };
};

export const fetchContacts = () => {
    return async (dispatch) => {
        const res = await axios.get(`${baseUrl}/allusers`);
        dispatch({
            type:FETCH_CONTACT,
            payload: res.data,
        });
    };
};
export const deleteContact = (id) => {
  return async (dispatch) => {
    try {
      await axios.delete(`${baseUrl}/deleteusers/${id}`);

      dispatch({
        type: DELETE_CONTACT,
        payload: id,
      });
      console.log("deleted succesfully");
      
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };
};


export const editcontact = (contact)=>({
    type:EDIT_CONTACT,
    payload:contact
})

export const updateContact = (contact) => {
  return async (dispatch) => {
    try {
      const response = await axios.put(
        `${baseUrl}/edituser/${contact._id}`,
        contact
      );
      dispatch({
        type: UPDATE_CONTACT,
        payload: response.data, 
      });
console.log('API Response:', response.data);
    } catch (error) {
      console.error("Update failed:", error);
    }
  };
};

export const toggleBookmark = (id)=>({
    type:TOGGLE_BOOKMARK,
    payload:id,
})
export const searchuser =(text)=>({
    type:SEARCH_USER,
    payload:text,
})
export const filterByLabel = (label) => ({
    type: FILTER_LABEL,
    payload: label
});

