
const knex = require("knex")(require("../knexfile"));
const { validateInventoryData } = require("../utils/validate");
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
        const allInventoryItems = await knex("inventories");
        const latestInventoryItemId = allInventoryItems[allInventoryItems.length - 1].id;
        const postedItem = req.body;
        
        const newInventoryItem = {
            "id": latestInventoryItemId + 1,
            "warehouse_id": postedItem.warehouse_id,
            "item_name": postedItem.item_name,
            "description": postedItem.description,
            "category": postedItem.category,
            "status": postedItem.status,
            "quantity": postedItem.quantity
          }

        const inventories = await knex("inventories").insert(newInventoryItem);
        res.status(200).json(newInventoryItem);
    } catch (error) {
        console.error("Failed to add new item to inventory:", error);
    }
  }

  // Update inventory item
const updateInventory = async (req, res) => {
  const { id } = req.params;
  const { warehouse_id, item_name, description, category, status, quantity } = req.body;

  // Validate request body
  const validation = await validateInventoryData(req.body);
  if (!validation.valid) {
    return res.status(400).json({ message: validation.message });
  }

  try {
    // Check if inventory item exists
    const inventory = await knex('inventories').where({ id }).first();
    if (!inventory) {
      return res.status(404).json({ message: `Inventory item with ID ${id} not found` });
    }

    // Update inventory item
    await knex('inventories')
      .where({ id })
      .update({
        warehouse_id,
        item_name,
        description,
        category,
        status,
        quantity
      });

    // Fetch the updated item
    const updatedInventory = await knex('inventories').where({ id }).first();

    res.status(200).json(updatedInventory);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: `Unable to update inventory: ${err}`
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
    getInventoriesByWarehouseId,
    addToInventory,
    removeInventory,
    updateInventory
  }