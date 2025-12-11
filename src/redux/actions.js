import axios from "axios";
import { ADD_CONTACT, DELETE_CONTACT, EDIT_CONTACT, FETCH_CONTACT, FETCH_PAGES, FILTER_LABEL, SEARCH_USER, TOGGLE_BOOKMARK, UPDATE_CONTACT } from "./actionTypes";
import { baseUrl } from "../../config";
export const addcontacts = (formData) => async (dispatch) => {
  try {
    const response = await axios.post(`${baseUrl}/user`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    dispatch({
      type: ADD_CONTACT,
      payload: response.data,
    });

    console.log("Contact added:", response.data);
  } catch (error) {
    console.error("Add contact failed:", error);
  }
};

export const fetchContacts = (name = "", label = "") => {
  return async (dispatch) => {
    const params = {};
    if (name) params.name = name;
    if (label) params.label = label;

    try {
      const res = await axios.get(`${baseUrl}/allusers`, { params });
      dispatch({
        type: FETCH_CONTACT,
        payload: res.data,
      });
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  };
};

export const deleteContact = (id) => {
    console.log("DELETE ID:",id);
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

export const updateContact = (formData, id) => async (dispatch, getState) => {
  try {
    await axios.put(`${baseUrl}/edituser/${id}`, formData);
    const existing = getState().contactsData.contacts.find(c => c._id === id);
    const updatedFields = Object.fromEntries(formData);
    const updatedContact = {
      ...existing,
      ...updatedFields,
      updatedAt: new Date().toISOString()
    };

    dispatch({
      type: UPDATE_CONTACT,
      payload: updatedContact,
    });

  } catch (error) {
    console.error('Error updating contact:', error);
  }
};
export const toggleBookmark = (id) => async (dispatch, getState) => {
  try {
    await axios.put(`${baseUrl}/edituser/${id}?toggleBookmark=true`);

    dispatch({
      type: "TOGGLE_BOOKMARK",
      payload: id,
    });
  } catch (error) {
    console.error("Error toggling bookmark:", error);
  }
};


export const searchuser = (name) => {
  return (dispatch, getState) => {
    dispatch({ type:SEARCH_USER, payload: name });

    const { label } = getState();
    dispatch(fetchContacts(name, label));
  };
};

export const filterByLabel = (label) => {
  return (dispatch, getState) => {
    dispatch({ type: FILTER_LABEL, payload: label });

    const { name } = getState();
    dispatch(fetchContacts(name, label));
  };
};

export const fetchContactsPage = (page = 1, limit = 5) => async (dispatch) => {
  try {
    const res = await axios.get(`${baseUrl}/paginatedusers?page=${page}&limit=${limit}`);
    console.log(res.data,"pagessssssssssss");
    
    dispatch({
      type: FETCH_PAGES,
      payload: {
        contacts: res.data.data,
        totalPages: res.data.totalPages,
        totalCount: res.data.totalCount,
        currentPage: page,
      },
    });
  } catch (err) {
    console.error("Error fetching contacts page:", err);
  }
};