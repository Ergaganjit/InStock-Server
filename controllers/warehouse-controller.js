
const knex = require("knex")(require("../knexfile"));



const getWarehouses=async (_req, res) => {
    try {
      const data = await knex("warehouses");
      res.json(data);
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "error getting warehouse list",
      });
    }
  };

  module.exports={   
    getWarehouses
  }