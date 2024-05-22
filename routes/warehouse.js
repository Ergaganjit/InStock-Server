const express = require("express");
const router = express.Router();



  
  // get array of images
  router.get("/", (req, res) => {
    res.send("<h1>Welcome to the Warehouse Route</h1>");
  });
;
  
 
  module.exports = router;