import React,{useState,useEffect} from "react";
import MainScreen from "../../components/MainScreen";
import { Badge, Button, Card, Accordion } from "react-bootstrap";
import { Link } from "react-router-dom";
import './MyNotes.css'
import axios from 'axios';



export default function MyNotes() {


  //here use state to handle data and the states of the data

  const [notes,setNotes]=useState([]);
  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
     
    }
  };


// we cannot call our api in use effect directly,so we are making a function

const fetchNotes = async() =>{

  const data = await axios.get("http://localhost:3001/api/notes");

  console.log("data from notes api",data);

  setNotes(data.data);
}
  //here the useeffect 
  useEffect(()=>{
    fetchNotes();

  },[])

  return (
    <MainScreen title="Welcome back Zunaira....">
      <Link to="createnote">
        <Button style={{ marginLeft: 10, marginBottom: 6 }} size="lg">
          Create New Note
        </Button>
      </Link>

      {notes.map((note) => (
        <Accordion key={note._id} className="my-2">
          <Accordion.Item eventKey="0">
            <Accordion.Header className="d-flex flex-row">
              
              <div className="d-flex flex-row w-100 justify-content-between">
                 {note.title}
                 <div>
  <Link to={`/notes/${note._id}`}>
                    <Button>Edit</Button>
                  </Link>

                  <Button
                    variant="danger"
                    onClick={() => deleteHandler(note._id)}
                  >
                    Delete
                  </Button>

                 </div>

             
              </div>
              
             
            </Accordion.Header>

            <Accordion.Body>
              <Card>
                 
               

                <Card.Body>
                  <h4>
                    <Badge bg="success">
                      Category - {note.category}
                    </Badge>
                  </h4>
                  <blockquote className="blockquote mb-0">
                    <p>{note.content}</p>
                    <footer className="blockquote-footer">
                      Created on - Date
                    </footer>
                  </blockquote>
                </Card.Body>
              </Card>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      ))}
    </MainScreen>
  );
}
