import React from "react";
import MainScreen from "../../components/MainScreen";
import { Badge, Button, Card,Accordion } from "react-bootstrap";
import { Link } from "react-router-dom";

import { notes } from "../../data/notes";
export default function MyNotes() {

    //definnig the delete handler 
    const deleteHandler = (id) => {
        
        if (window.confirm('Are you sure...?')) {
            
        }
    }

  return (
    <>
      <MainScreen title="Welcome back Zunaira....">
        <Link to="createnote">
          <Button style={{ marginLeft: 10, marginBottom: 6 }} size="lg">
            create new node
          </Button>
        </Link>

            {notes.map((note) => (
              <Card key={note._id}>
                <Card.Header className="d-flex">
                  <span
                    style={{
                      color: "black",
                      textDecoration: "none",
                      flex: 1,
                      cursor: "pointer",
                      alignSelf: "center",
                      fontSize: 18,
                    }}
                  >
                   
                      {note.title}
                  </span>

                  <div>
                    <Button href={`notes/${note._id}`}>Edit</Button>
                    <Button
                      variant="danger"
                      onClick={() => deleteHandler(note._id)}
                    >
                      Delete
                    </Button>
                  </div>
                </Card.Header>

              
                  <Card.Body>
                    <h4>
                      <Badge bg="success">category - {note.category}</Badge>
                    </h4>
                    <blockquote className="blockquote mb-0">
                      <p>{note.content}</p>
                      <footer className="blockquote-footer">
                        Created on - Date
                      </footer>
                    </blockquote>
                  </Card.Body>
              </Card>
            ))}
      </MainScreen>
    </>
  );
}
