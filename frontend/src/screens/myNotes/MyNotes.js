import React, { useState, useEffect } from "react";
import MainScreen from "../../components/MainScreen";
import { Badge, Button, Accordion } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import "./MyNotes.css";

export default function MyNotes() {
  const [notes, setNotes] = useState([]);

  const fetchNotes = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/notes");
      setNotes(response.data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure?")) {
      await axios.delete(`http://localhost:3001/api/notes/${id}`);
      setNotes(notes.filter((note) => note._id !== id));
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

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
