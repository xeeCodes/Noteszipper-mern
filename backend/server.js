const express = require("express");
const notes = require("./data/notes.js");
const dotenv = require("dotenv");
const app = express();

//config thr dotenv
dotenv.config();

//here creating a route

app.get("/", (req, res) => {
  res.send("Api is working... ");
});

app.get("/api/notes", (req, res) => {
  res.json(notes);
});

app.get("/api/notes/:id", (req, res) => {
  const note = notes.find((n) => n._id === req.params.id);
  console.log(req.params);
  res.send(note);
});

// here creating a server
console.log("Initializing Express server...");
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
