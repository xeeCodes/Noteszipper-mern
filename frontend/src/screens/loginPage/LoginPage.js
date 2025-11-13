  import Form from 'react-bootstrap/Form';
  import {useState,useEffect} from 'react';
  import MainScreen from '../../components/MainScreen';
  import { Button,Row,Col } from 'react-bootstrap';
  import { Link } from 'react-router-dom';
  import Loading from '../../components/Loading';
  import './LoginScreen.css';
  import {login} from "../../actions/UserActions" 
  import {useDispatch, useSelector} from 'react-redux';
  import { useNavigate } from "react-router-dom";

  import ErrorMesage from '../../components/ErrorMesage';


  function LoginPage({}) {

      const navigate = useNavigate();


      const[formState,setFormState] =useState({
  email:'',
  password:'',

      })

      // use this ti use the actions
      const dispatch = useDispatch(); 

      //access the stte using he selector
  const userLogin = useSelector((state) => state.userLogin);

      const {loading,error,userinfo} = userLogin;


    const handleChange = (e) => {
    const { name, value } = e.target;

    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


useEffect(() => {
  const userInfo = localStorage.getItem('userInfo');
  if (userInfo) {
    navigate('/mynotes');
  }
}, [navigate, userLogin.userInfo]);


      const handleSubmit = async (e) =>{
  e.preventDefault();  
          console.log("Form is submitted");
          console.log("Data from formstate",formState);

        dispatch(login(formState));


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
onChange={(e) => handleChange(e)}

          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGroupPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control  
          name='password'
          type="password" 
          value={formState.password}
onChange={(e) => handleChange(e)}

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
