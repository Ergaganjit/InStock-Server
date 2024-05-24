
const knex = require("knex")(require("../knexfile"));


//get all warehouse
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


//delete warehouse
const removeWarehouse = async (req, res) => {
    try {
      const rowsDeleted = await knex("warehouses")
        .where({ id: req.params.id })
        .delete();
  
      if (rowsDeleted === 0) {
        return res
          .status(404)
          .json({ message: `warehouse with ID ${req.params.id} not found` });
      }
      // No Content response
      res.sendStatus(204);
    } catch (error) {
      res.status(500).json({
        message: `Unable to delete warehouse: ${error}`
      });
    }
  };

  //get single warehouse
  const getSingleWarehouse = async (req, res) => {
    try {
        const warehouse = await knex('warehouses').where({ id: req.params.id }).first();
        if (!warehouse) {
            return res.status(404).json({ message: `Warehouse ${req.params.id} not found` });
        }
        res.status(200).json(warehouse);
    } catch (error) {
        res.status(500).json({ message: `Unable to get warehouse: ${error}` });
    }
};

  module.exports={   
    getWarehouses,
    removeWarehouse,
    getSingleWarehouse
  }