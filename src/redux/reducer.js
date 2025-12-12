import { ADD_CONTACT, DELETE_CONTACT, EDIT_CONTACT, FETCH_CONTACT, FETCH_PAGES, FILTER_LABEL, SEARCH_USER, TOGGLE_BOOKMARK, UPDATE_CONTACT } from "./actionTypes";

const initialState = {
contacts: [],
editingcontact: null,
search: "",
filtering: "",
currentPage: 1,
totalPages: 1,
totalCount: 0,
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
contacts: [...state.contacts, {
...action.payload,
bookmarked: action.payload.bookmarked || false,
updatedAt: new Date().toISOString()
}],
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

// case UPDATE_CONTACT:
// console.log("UPDATE_CONTACT reducer hit", action.payload);
// const updated = action.payload;

// return {
// ...state,
// contacts: state.contacts.map(c =>
// c._id === updated._id
// ? {
// ...c,
// ...updated,
// bookmarked:
// updated.bookmarked !== undefined
// ? updated.bookmarked
// : c.bookmarked,
// updatedAt: updated.updatedAt || new Date().toISOString()
// }
// : c
// ),
// editingcontact: null,
// };
case UPDATE_CONTACT: {
  const updated = action.payload;

  return {
    ...state,
    contacts: state.contacts.map(c =>
      c._id === updated._id
        ? {
            ...c,
            ...updated,
            bookmarked: updated.bookmarked,
            updatedAt: new Date().toISOString()
          }
        : c
    ),
  };
}




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
return {
...state,
contacts: state.contacts.map((c) =>
c._id === action.payload
? {
...c,
bookmarked: !c.bookmarked,
updatedAt: new Date().toISOString()
}
: c
),
};
case FETCH_PAGES:
return {
...state,
contacts: action.payload.contacts.map(c => ({
...c,
bookmarked: c.bookmark,
})),
currentPage: action.payload.currentPage,
totalPages: action.payload.totalPages,
totalCount: action.payload.totalCount,
};


default:
return state;
}
};
