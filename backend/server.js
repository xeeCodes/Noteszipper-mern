  const express = require("express");
  const cors = require("cors");
const connectdb = require("./config/db")
  const notes = require("./data/notes.js");
  const dotenv = require("dotenv");
  const userRoutes = require('./routes/userRoutes');
  const multer  = require('multer');
const upload = multer({ dest: "uploads/" });
const { notFound, errorHandler } = require("./middleware/errorMiddleware.js");


  const app = express();
  app.use(express.json());

  //config thr dotenv
  dotenv.config();
  app.use(cors());
  connectdb();

  //here creating a route

  app.get("/", (req, res) => {
    res.send("Api is working... ");
  });

  app.get("/api/notes", (req, res) => {
    res.json(notes);
  });


  // user routes

  app.use("/api/users",userRoutes);
  
 // use middleware

 app.use(notFound);
 app.use(errorHandler);

  // here creating a server
  console.log("Initializing Express server...");
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
