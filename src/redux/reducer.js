import { editcontact } from "./actions";
import { ADD_CONTACT, DELETE_CONTACT, EDIT_CONTACT, SEARCH_USER, TOGGLE_BOOKMARK, UPDATE_CONTACT } from "./actionTypes";

const initialState = {
    contacts:[],
    editingcontact:null,
    search:""
}

export const phoneBookReducer = (state=initialState,action)=>{
    switch (action.type) {
          case ADD_CONTACT :
            console.log("contact added")
            const exists = state.contacts.find(c=>c.contact===action.payload.contact)
            if(exists){
               alert("Contact already exists")
                // return state;    
            }else{
            return {
                ...state, 
                contacts:[...state.contacts,action.payload]
            }}
             
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
                case SEARCH_USER:
                console.log("search users");
                
                return{
                    search:action.payload
                }
            case TOGGLE_BOOKMARK:
                console.log("bookmark added")
            return {
                ...state,
                contacts: state.contacts.map((c) =>
                    c.id === action.payload
                        ? { ...c, bookmarked: !c.bookmarked }
                        : c
                ),
            }
         
    
        default:
            return state;
    }

}