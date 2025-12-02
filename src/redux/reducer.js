import { ADD_CONTACT, DELETE_CONTACT, EDIT_CONTACT, FILTER_LABEL, SEARCH_USER, TOGGLE_BOOKMARK, UPDATE_CONTACT } from "./actionTypes";

const initialState = {
    contacts: [],
    editingcontact: null,
    search: "",
    filtering: "",
};

const phoneRegex = /^\d{10}$/; 

export const phoneBookReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_CONTACT:
            console.log("Contact added");
            const exists = state.contacts.find((c) => c.contact === action.payload.contact);
            if (exists) {
                alert("Contact already exists");
            } else if (!phoneRegex.test(action.payload.contact)) {
                alert("Please enter a valid phone number");
            } else {
                return {
                    ...state,
                    contacts: [...state.contacts, action.payload],
                };
            }
            break;

        case DELETE_CONTACT:
            return {
                ...state,
                contacts: state.contacts.filter((c) => c.id !== action.payload),
            };

        case EDIT_CONTACT:
            console.log("Edit button clicked");
            return {
                ...state,
                editingcontact: action.payload,
            };

        case UPDATE_CONTACT:
            const updatedContact = action.payload;
            console.log("Updating", updatedContact);

            if (!phoneRegex.test(updatedContact.contact)) {
                alert("Please enter a valid phone number");
                console.log( updatedContact.contact);
                return state;
            }

            console.log("Valid phone number, updating contact...");
            return {
                ...state,
                contacts: state.contacts.map((c) =>
                    c.id === updatedContact.id ? updatedContact : c
                ),
                editingcontact: null,
            };

        case SEARCH_USER:
            console.log("Search users triggered");
            return {
                ...state,
                search: action.payload,
            };

        case FILTER_LABEL:
            console.log("Filtering contacts by label");
            return {
                ...state,
                filtering: action.payload,
            };

        case TOGGLE_BOOKMARK:
            console.log("Bookmark toggled");
            return {
                ...state,
                contacts: state.contacts.map((c) =>
                    c.id === action.payload ? { ...c, bookmarked: !c.bookmarked } : c
                ),
            };

        default:
            return state;
    }
};
