
import { applyMiddleware, combineReducers } from 'redux';
import { createStore } from 'redux';
import {thunk} from 'redux-thunk';
import { phoneBookReducer } from './reducer';


const rootReducer = combineReducers({
    contactsData:phoneBookReducer
})

 const store = createStore(rootReducer, applyMiddleware(thunk))

 export default store