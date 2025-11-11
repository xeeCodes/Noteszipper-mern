import Form from 'react-bootstrap/Form';
import {useState,useEffect} from 'react';
import MainScreen from '../../components/MainScreen';
import { Button,Row,Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Loading from '../../components/Loading';
import './LoginScreen.css';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

import ErrorMesage from '../../components/ErrorMesage';


function LoginPage({}) {

    const navigate = useNavigate();


    const[formState,setFormState] =useState({
email:'',
password:'',

    })
const [error,setError] = useState('');
const [loading,setLoading] = useState(false);


   const handleChange = (e) => {
  const { name, value } = e.target;

  setFormState((prev) => ({
    ...prev,
    [name]: value,
  }));
};


useEffect(()=>{

     const userInfo = localStorage.getItem('userInfo');
if(userInfo){

    navigate('/mynotes');
}

},[history]);

    const handleSubmit = async (e) =>{
e.preventDefault();  
        console.log("Form is submitted");
        console.log("Data from formstate",formState);

        try{
setLoading(true);
            const response = await axios.post("http://localhost:3001/api/users/login",

                formState,
            );

            localStorage.setItem("userInfo",JSON.stringify(response.data));
            setError('');
            console.log("LOgin Successully");

        }
        catch(error){
setError(error.response.data.message);
        }
        finally{

            setLoading(false);
            
        }


    }

  return (
   <>
  <MainScreen title="LOGIN">

    <div className='container loginContainer'>

        {error && <ErrorMesage variant='danger'>{error}</ErrorMesage>}
{loading ? <Loading/> : <>

    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formGroupEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control  
        name='email'
        value={formState.email}
        type="email"
        placeholder="Enter email" 
        onChange={handleChange}

        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formGroupPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control  
        name='password'
        type="password" 
        value={formState.password}
        onChange={handleChange}

        placeholder="Password" />
      </Form.Group>

       <Button variant="primary" type="submit">
            Submit
          </Button>
    </Form>
      <Row className="py-3">
          <Col>
            New Customer ? <Link to="/register">Register Here</Link>
          </Col>
        </Row></>}
     
    </div>
  </MainScreen>
  
   
   </>
  )
}

export default LoginPage
