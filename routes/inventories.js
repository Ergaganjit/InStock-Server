const express = require("express");
const knex = require("knex")(require("../knexfile"));
const router = express.Router();



  // to get all inventories data
  router.get("/", async (_req, res) => {
    try {
      const data = await knex("inventories");
      res.json(data);
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "error getting warehouse list",
      });
    }
  });
  
 
  module.exports = router;
  