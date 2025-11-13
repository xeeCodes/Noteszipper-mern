import { USER_LOGIN_FAIL,USER_LOGIN_SUCCESS,USER_LOGIN_REQUEST, USER_LOGOUT,USER_REGISTER_FAIL,USER_REGISTER_REQUEST,USER_REGISTER_SUCCESS } from "../constants/UserConstants";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export const login = (formState) => async (dispatch) =>{

        try{

dispatch({type: USER_LOGIN_REQUEST});

            const response = await axios.post("http://localhost:3001/api/users/login",

                formState,
            );

            dispatch({type:USER_LOGIN_SUCCESS,payload: response.data});

            localStorage.setItem("userInfo",JSON.stringify(response.data));
            
            console.log("Login Successully");

        }
        catch(error){

dispatch({
   type: USER_LOGIN_FAIL,
   payload:
   error.response && error.response.data.message
   ?  error.response.data.message
   : error.message
});


        }
        


    };

    export const logout = () => async(dispatch)=>{

        localStorage.removeItem('userInfo');
        dispatch({type:USER_LOGOUT});
    }
// Register Actions


export const regsiter = (formState,myFormData) => async (dispatch) => {



  if (formState.password !== formState.confirmpassword) {
    return;
  }

  try {


    dispatch({type:USER_REGISTER_REQUEST})

    const apiFormData = myFormData();

    const response = await axios.post(
      "http://localhost:3001/api/users/register",
      apiFormData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );
dispatch({type:USER_REGISTER_SUCCESS,payload:response.data});
dispatch({type:USER_LOGIN_SUCCESS,payload:response.data});


  } catch (error) {

dispatch({type:USER_REGISTER_FAIL,payload:
    error.response && error.response.data.message
    ?error.response.data.message
    : error.message
});
  }

};
