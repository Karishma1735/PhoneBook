import { ADD_CONTACT, DELETE_CONTACT, EDIT_CONTACT, FETCH_CONTACT, FILTER_LABEL, SEARCH_USER, TOGGLE_BOOKMARK, UPDATE_CONTACT } from "./actionTypes";

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
    const exists = state.contacts.find(c => c.contact === action.payload.contact);
    if (exists || !phoneRegex.test(action.payload.contact)) {
        return state;
    }
    return {
        ...state,
        contacts: [...state.contacts, action.payload],
    };

            break;
                case FETCH_CONTACT:
            return {
                ...state,
                contacts: action.payload.data,
            };

        case DELETE_CONTACT:
            return {
                ...state,
                contacts: state.contacts.filter((c) => c._id !== action.payload),
            };

        case EDIT_CONTACT:
            console.log("Edit button clicked");
            return {
                ...state,
                editingcontact: action.payload,
            };

        case UPDATE_CONTACT:
              console.log('Updated Contact:', action.payload);
    const updated = action.payload;
    if (!phoneRegex.test(updated.contact)) {
        return state; 
    }
    return {
        ...state,
        contacts: state.contacts.map(c =>
            c._id === updated._id ? { ...c, ...updated } : c
        ),
        editingcontact: null,
    };

        case SEARCH_USER:
            console.log("Search users triggered");
            return {
                ...state,
                search: action.payload.toLowerCase(),
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
