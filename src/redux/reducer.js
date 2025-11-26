import { editcontact } from "./actions";
import { ADD_CONTACT, DELETE_CONTACT, EDIT_CONTACT, UPDATE_CONTACT } from "./actionTypes";

const initialState = {
    contacts:[],
    editingcontact:null
}

export const phoneBookReducer = (state=initialState,action)=>{
    switch (action.type) {
          case ADD_CONTACT :
            console.log("contact added")
            return {
                ...state, 
                contacts:[...state.contacts,action.payload]
            }
             
            case DELETE_CONTACT:
                return{
                    ...state,
                    contacts:state.contacts.filter((c)=>c.id!==action.payload)
                }

            case EDIT_CONTACT:
                console.log("edit button clicked")
                return{
                    ...state,
                    editingcontact:action.payload
                }
           case UPDATE_CONTACT:
            return{
                ...state,
                contacts:state.contacts.map((c)=>c.id===action.payload.id?action.payload:c),
                editingcontact:null
              
            }

    
        default:
            return state;
    }

}