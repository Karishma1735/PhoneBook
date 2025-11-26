
import { combineReducers } from 'redux';
import { createStore } from 'redux';
import { phoneBookReducer } from './reducer';


const rootReducer = combineReducers({
    contactsData:phoneBookReducer
})

 const store = createStore(rootReducer)

 export default store