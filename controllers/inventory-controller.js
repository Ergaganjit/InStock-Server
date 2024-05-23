
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

  //get inventory by id
  const getInventoryById = async (req, res) => {
    try {
      const { id } = req.params;
      const data = await knex("inventories")
        .join("warehouses", "inventories.warehouse_id", "=", "warehouses.id")
        .select(
          "inventories.id",
          "warehouses.warehouse_name",
          "inventories.item_name",
          "inventories.description",
          "inventories.category",
          "inventories.status",
          "inventories.quantity"
        )
        .where("inventories.id", id)
        .first();
  
      if (!data) {
        return res.status(404).json({ message: `Inventory item with ID ${id} not found` });
      }
  
      res.status(200).json(data);
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "error getting inventory item",
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
    getInventoryById,
    removeInventory
  }