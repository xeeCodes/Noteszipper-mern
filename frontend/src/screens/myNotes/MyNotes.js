import React, { useState, useEffect } from "react";
import MainScreen from "../../components/MainScreen";
import { Badge, Button, Accordion } from "react-bootstrap";
import { Link } from "react-router-dom";
import {useDispatch,useSelector} from 'react-redux';
import "./MyNotes.css";
import { fetchNotes } from "../../actions/NotesActions";
import { useNavigate } from "react-router-dom";
export default function MyNotes() {

  const dispatch = useDispatch();
  const noteList = useSelector(state => state.allNotes);
  const{Loading,notes,error} = noteList;

  const userLogin = useSelector((state) => state.userLogin);
  const {userInfo} = userLogin;

  const createNote = useSelector((state) => state.createNote);
  const {success : successCreate} = createNote;

const navigate = useNavigate();

 
  useEffect(() => {
    dispatch(fetchNotes());
  }, [dispatch]);

  return (
    <MainScreen title="Welcome back Zunaira....">
      <Link to="/createnote">
        <Button style={{ marginLeft: 10, marginBottom: 6 }} size="lg">
          Create New Note
        </Button>
      </Link>

      {notes && [...notes].reverse().map((note)=>(
        <Accordion key={note._id} className="my-2">
          <Accordion.Item eventKey="0">
            <Accordion.Header>{note.title}</Accordion.Header>
            <Accordion.Body>
              <h4>
                <Badge bg="success">Category - {note.category}</Badge>
              </h4>
              <p>{note.content}</p>
              <footer className="blockquote-footer">Created on - Date</footer>

              <div className="d-flex mt-2">
                <Link to={`/notes/${note._id}`}>
                  <Button variant="info" size="sm" className="mx-2">
                    Edit
                  </Button>
                </Link>
                <Button variant="danger" size="sm" onClick={() => deleteHandler(note._id)}>
                  Delete
                </Button>
              </div>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      ))}
    </MainScreen>
  );
}
