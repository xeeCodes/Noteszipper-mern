import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import { useNavigate } from "react-router-dom";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import {logout} from '../../actions/UserActions'
import { useDispatch, useSelector } from "react-redux";
import {NOTES_LIST_RESET} from '../../constants/NoteConstants'
export default function Header() {

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const userLogin = useSelector(state => state.userLogin);
  const {userInfo} = userLogin;

  const logoutHandler = () =>{
    dispatch(logout());
      // dispatch({ type: NOTES_LIST_RESET });  

    navigate('/');
  }

  return (
    <>
      <Navbar expand="lg" className="bg-primary">
        <Container>
          <Col xl={3}>
            <Link to="/">
              <Navbar.Brand className="text-white">Note Zipper</Navbar.Brand>
            </Link>
          </Col>

          <Col xl={6}>
            <Form >
              <Row>
                <Col xl={4}>
                  <Form.Control
                    type="text"
                    placeholder="Search"
                    className=" mr-sm-2"
                  />
                </Col>
              </Row>
            </Form>
          </Col>

          <Col xl={3}>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto ">
                <Nav.Link as={Link} to="/mynotes" className="text-white">
  My Notes
</Nav.Link>


                <NavDropdown
                  title={<span className="text-white">Zunaira Anwar</span>}
                  id="basic-nav-dropdown"
                >
                  <NavDropdown.Item href="#action/3.1" className="">
                    My Profile
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2" onClick={logoutHandler}>Logout</NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Col>
        </Container>
      </Navbar>
    </>
  );
}
