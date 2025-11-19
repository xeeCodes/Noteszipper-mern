import { USER_LOGIN_REQUEST, USER_REGISTER_REQUEST } from "../constants/UserConstants";
import axios from 'axios';


// user login action

export const loginUser = (formState) =>({
  type :USER_LOGIN_REQUEST,
  payload: {formState}

});

// user register action

export const registerUser = (formState) =>({
  type :USER_REGISTER_REQUEST,
  payload: {formState}

});



// export const login = (formState) => async (dispatch) =>{


//         try{

// dispatch({type: USER_LOGIN_REQUEST});

//             const response = await axios.post("http://localhost:3001/api/users/login",

//                 formState,
//             );

//             dispatch({type:USER_LOGIN_SUCCESS,payload: response.data});

//             localStorage.setItem("userInfo",JSON.stringify(response.data));
//             console.log("Login Successully");

//         }
//         catch(error){

// dispatch({
//    type: USER_LOGIN_FAIL,
//    payload:
//    error.response && error.response.data.message
//    ?  error.response.data.message
//    : error.message
// });


//         }
        


//     };

//     export const logout = () => {
//   localStorage.removeItem("userInfo");
//   return { type: USER_LOGOUT };
// };



// export const regsiter = (formState,myFormData) => async (dispatch) => {



//   if (formState.password !== formState.confirmpassword) {
//     return;
//   }

//   try {


//     dispatch({type:USER_REGISTER_REQUEST})

//     const apiFormData = myFormData();

//     const response = await axios.post(
//       "http://localhost:3001/api/users/register",
//       apiFormData,
//       { headers: { "Content-Type": "multipart/form-data" } }
//     );
// dispatch({type:USER_REGISTER_SUCCESS,payload:response.data});
// dispatch({type:USER_LOGIN_SUCCESS,payload:response.data});


//   } catch (error) {

// dispatch({type:USER_REGISTER_FAIL,payload:
//     error.response && error.response.data.message
//     ?error.response.data.message
//     : error.message
// });
//   }

// };
