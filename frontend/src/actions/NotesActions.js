// src/actions/notesActions.js
import {
  NOTES_LIST_REQUEST,
  CREATE_NOTE_REQUEST,
  NOTES_DELETE_REQUEST,
  NOTES_UPDATE_REQUEST,
} from "../constants/NoteConstants";

export const fetchNotes = () => ({ type: NOTES_LIST_REQUEST });

export const createNote = (title, content, category) => ({
  type: CREATE_NOTE_REQUEST,
  payload: { title, content, category },
});

export const deleteNote = (id) => ({
  type: NOTES_DELETE_REQUEST,
  payload: id,
});

export const updateNote = (id, title, content, category) => ({
  type: NOTES_UPDATE_REQUEST,
  payload: { id, title, content, category },
});


// export const allNotes = () => async(dispatch, getState) => {

//     try{

//         dispatch({type: NOTES_LIST_REQUEST});

//         const {userLogin : {userInfo},} = getState();

//         const config = {
//             headers :{
//                     Authorization : `Bearer ${userInfo.token}`
//             }
//         }


//             const response = await axios.get("http://localhost:3001/api/notes",

//                 config
//             );


//             dispatch({type:NOTES_LIST_SUCCESS,payload: response.data});

            
//             console.log("My data",response.data);


        
//     }

//     catch(error){

//         dispatch({
//            type: NOTES_LIST_FAIL,
//            payload:
//            error.response && error.response.data.message
//            ?  error.response.data.message
//            : error.message
//         });

//     }


// }

// create a note action
// export const createNoteAction = (title, content, category) => async(dispatch, getState) => {

//     try{

//         dispatch({type: CREATE_NOTE_REQUEST});

//         const {userLogin : {userInfo},} = getState();

//         const config = {
//             headers :{
//                 "Content-Type" : "application/json",
//                     Authorization : `Bearer ${userInfo.token}`,
//             }
//         }

// console.log("not received data yet");
//             const response = await axios.post("http://localhost:3001/api/notes/create",

//                 {title, content, category},

//                 config
//             );


//             dispatch({type:CREATE_NOTE_SUCCESS,payload: response.data});
//                     dispatch(allNotes());


            
//             console.log("My Created note data",response.data);


        
//     }

//     catch(error){

//         dispatch({
//            type: CREATE_NOTE_FAIL,
//            payload:
//            error.response && error.response.data.message
//            ?  error.response.data.message
//            : error.message
//         });

//     }


// };


// export const deleteNoteAction = (id) => async (dispatch, getState) => {
//   try {
//     dispatch({
//       type: NOTES_DELETE_REQUEST,
//     });

//     const {
//       userLogin: { userInfo },
//     } = getState();

//     const config = {
//       headers: {
//         Authorization: `Bearer ${userInfo.token}`,
//       },
//     };

//     const { data } = await axios.delete(`/api/notes/${id}`, config);

//     dispatch({
//       type: NOTES_DELETE_SUCCESS,
//       payload: data,
//     });
//   } catch (error) {
//     const message =
//       error.response && error.response.data.message
//         ? error.response.data.message
//         : error.message;
//     dispatch({
//       type: NOTES_DELETE_FAIL,
//       payload: message,
//     });
//   }
// };

// export const updateNoteAction = (id, title, content, category) => async (
//   dispatch,
//   getState
// ) => {
//   try {
//     dispatch({
//       type: NOTES_UPDATE_REQUEST,
//     });

//     const {
//       userLogin: { userInfo },
//     } = getState();

//     const config = {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${userInfo.token}`,
//       },
//     };

//     const { data } = await axios.put(
//       `/api/notes/${id}`,
//       { title, content, category },
//       config
//     );

//     dispatch({
//       type: NOTES_UPDATE_SUCCESS,
//       payload: data,
//     });
//   } catch (error) {
//     const message =
//       error.response && error.response.data.message
//         ? error.response.data.message
//         : error.message;
//     dispatch({
//       type: NOTES_UPDATE_FAIL,
//       payload: message,
//     });
//   }
// };