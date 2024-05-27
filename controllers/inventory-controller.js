

const knex = require("knex")(require("../knexfile"));
const { validateUpdateInventory } = require('../utils/validate');

//get inventory
const  getInventories = async (_req, res) => {
    try {
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
        );
      res.status(200).json(data);
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "Error getting inventory list",
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

  //get inventory for specific warehouse by warehouse id
  const getInventoriesByWarehouseId = async (req, res) => {
    try {
      const { id } = req.params;
      const warehouse = await knex("warehouses").where({ id }).first();
  
      if (!warehouse) {
        return res.status(404).json({ message: `Warehouse with ID ${id} not found` });
      }
  
      const inventories = await knex("inventories")
        .select("id", "item_name", "category", "status", "quantity")
        .where("warehouse_id", id);
  
      res.status(200).json(inventories);
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "error getting inventories for the warehouse",
      });
    }
  };

  const addToInventory = async (req, res) => {
      try {
          const {
              warehouse_id,
              item_name,
              description,
              category,
              status,
              quantity,
          } = req.body;

          const newInventoryValidation = await validateNewInventoryData(req.body);
          const { isValid, errorMessage } = newInventoryValidation;

          if (isValid) {
              const newInventoryItem = {
                  warehouse_id,
                  item_name,
                  description,
                  category,
                  status,
                  quantity
              };

              const newInventory = await knex('inventories').insert(newInventoryItem);
              const latestInventoryItem = await knex('inventories').orderBy('id', 'desc').first();
              console.log("latestInventory", latestInventoryItem);
              res.status(201).json(latestInventoryItem);

          } else {
              res.status(400).json(`Error: ${errorMessage}`);
          }
      } catch (error) {
          console.error('Failed to add new item to inventory:', error);
      }
  };

//Update 
const updateInventory = async (req, res) => {
  const validationResult = await validateUpdateInventory(req, res);

  if (validationResult.status !== 200) {
    return res.status(validationResult.status).json({ message: validationResult.message });
  }

  const { warehouseId } = validationResult;
  const { item_name, description, category, status, quantity } = req.body;

  knex("inventories")
    .where({ id: req.params.id })
    .update({
      warehouse_id: warehouseId,
      item_name,
      description,
      category,
      status,
      quantity: status === "Out of Stock" ? 0 : quantity,
    })
    .then(() => {
      res.status(200).json({ message: "Inventory item updated successfully" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "An error occurred" });
    });
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
    getInventoriesByWarehouseId,
    addToInventory,
    removeInventory,
    updateInventory
  }