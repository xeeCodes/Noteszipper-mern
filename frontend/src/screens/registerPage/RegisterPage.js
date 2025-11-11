import Loading from '../../components/Loading';
import { Form, Button, Row, Col } from "react-bootstrap";
import {Link} from 'react-router-dom';
import ErrorMesage from '../../components/ErrorMesage';
import { useState,useEffect } from 'react';
import MainScreen from '../../components/MainScreen';
import './RegisterPage.css';
import axios from 'axios';

export default function RegisterPage() {

const[formState,setformState] = useState({
name:'',
email:'',
picture:'',
password:'',
confirmpassword:'',
picMessage:'',

})

const[error,setError] =useState('');
const[loading,setLoading] =useState(false);

const[message,setMessage] =useState('');


const HandleChange = (e) => {
  const { name, value, files } = e.target;

  if (files && files.length > 0) {
    setformState(prev => ({
      ...prev,
      picture: files[0],
    }));
    return;
  }

  setformState(prev => ({
    ...prev,
    [name]: value
  }));
};



useEffect(()=>{


},[])


const myFormData =()=>{

    const apiFormData = new FormData();

    apiFormData.append('name',formState.name);
        apiFormData.append('email',formState.email);
    apiFormData.append('password',formState.password);
    apiFormData.append('picture',formState.picture);

    return apiFormData;


    


}

const submitHandler = async (e) => {
  e.preventDefault();
  setError("");
  setMessage("");

  if (formState.password !== formState.confirmpassword) {
    setError("Passwords do not match");
    return;
  }

  try {
    setLoading(true);
    const apiFormData = myFormData();

    const response = await axios.post(
      "http://localhost:3001/api/users/register",
      apiFormData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );

    console.log("User is Registered", response.data);
    setMessage("Registration successful!");

  } catch (err) {
    console.log(err.message);
    setError(err.response?.data?.message || "Registration failed");
  }

  setLoading(false);
};

  return (
   <>
   
    <MainScreen title="REGISTER">
      <div className="container registerContainer">
        {error && <ErrorMesage variant="danger">{error}</ErrorMesage>}
        {message && <ErrorMesage variant="danger">{message}</ErrorMesage>}
        {loading && <Loading />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control   
              type="name"
              name='name'
              value={formState.name}
              placeholder="Enter name"
              onChange={HandleChange}
            />
          </Form.Group>

          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              name='email'
              value={formState.email}
              placeholder="Enter email"
              onChange={HandleChange}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name='password'
              value={formState.password}
              placeholder="Password"
              onChange={HandleChange}
            />
          </Form.Group>

          <Form.Group controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              name='confirmpassword'
              value={formState.confirmpassword}
              placeholder="Confirm Password"
              onChange={HandleChange}
            />
          </Form.Group>

          {formState.picMessage && (
            <ErrorMesage variant="danger">{formState.picMessage}</ErrorMesage>
          )}
          <Form.Group controlId="pic">
  <Form.Label>Profile Picture</Form.Label>
  <Form.Control
    type="file"
    name="picture"
    onChange={HandleChange}
  />
</Form.Group>


          <Button className='reg-button m-3' variant="primary" type="submit">
            Register
          </Button>
        </Form>
        <Row className="py-3">
          <Col>
            Have an Account ? <Link to="/login">Login</Link>
          </Col>
        </Row>
      </div>
    </MainScreen>
   
   </>
  )
}
