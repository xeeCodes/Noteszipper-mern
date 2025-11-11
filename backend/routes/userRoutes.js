const express = require("express");
const {registerUser, loginUser} = require("../controllers/userController")
const router  = express.Router();
const multer = require('multer');


const upload = multer({ dest: "uploads/" }); 


//user routes

router.post("/register", upload.single("picture"), registerUser);
router.route('/login').post(loginUser);


module.exports = router;