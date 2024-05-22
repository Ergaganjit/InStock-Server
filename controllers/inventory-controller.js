
const knex = require("knex")(require("../knexfile"));

const index=async (_req, res) => {
    try {
      const data = await knex("inventories");
      res.json(data);
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "error getting inventory list",
      });
    }
  };

  module.exports={   
    index
  }