import { combineReducers, configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from "redux-saga";
import rootSaga from "./sagas/rootSaga";

import { userLoginReducer, userRegisterReducer } from './reducers/userReducer'
import { createNoteReducer, noteListReducer ,noteDeleteReducer,noteUpdateReducer} from './reducers/noteReducer';

const userInfoFromLocalStorage = localStorage.getItem('userInfo') ?

JSON.parse(localStorage.getItem('userInfo')) :null;

const initialState = {
  
userLogin:{userInfo:userInfoFromLocalStorage},

};

const reducer = combineReducers({

  userLogin :userLoginReducer,
  userRegister :userRegisterReducer,
  allNotes :noteListReducer,
  createNote :createNoteReducer,
   noteDelete: noteDeleteReducer,
  noteUpdate: noteUpdateReducer,
}); 

// create middleware
const sagaMiddleware = createSagaMiddleware();


const store = configureStore({

  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),

  preloadedState:initialState
});

sagaMiddleware.run(rootSaga);


export default store;