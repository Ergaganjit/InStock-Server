
const knex = require("knex")(require("../knexfile"));

//get inventory
const getInventories=async (_req, res) => {
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

  //delete inventory
const removeInventory = async (req, res) => {
  try {
    const rowsDeleted = await knex("inventories")
      .where({ id: req.params.id })
      .delete();

    if (rowsDeleted === 0) {
      return res
        .status(404)
        .json({ message: `inventory with ID ${req.params.id} not found` });
    }

    // No Content response
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({
      message: `Unable to delete inventory: ${error}`
    });
  }
};

  module.exports={   
    getInventories,
    removeInventory
  }