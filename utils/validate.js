const knex = require("knex")(require("../knexfile"));


const validateUpdateInventory = async (req, res) => {
    const { warehouse_id, item_name, description, category, status, quantity } = req.body;
    const { id } = req.params;
  
    if (!warehouse_id || !item_name || !description || !category || !status) {
      return { status: 400, message: 'All fields are required' };
    }
  
    if (status === 'In Stock' && (quantity === undefined || isNaN(quantity))) {
      return { status: 400, message: 'Quantity must be a number and present when status is In Stock' };
    }
  
    try {
      const inventory = await knex('inventories').where({ id }).first();
      if (!inventory) {
        return { status: 404, message: 'Inventory ID not found' };
      }
  
      const warehouse = await knex('warehouses').where({ id: warehouse_id }).first();
      if (!warehouse) {
        return { status: 400, message: 'Invalid warehouse ID' };
      }
  
      return { status: 200, warehouseId: warehouse.id };
    } catch (error) {
      console.error(error);
      return { status: 500, message: 'An error occurred during validation' };
    }
  };

const validateNewInventoryData = async (data) => {
    const { warehouse_id, item_name, description, category, status, quantity } = data;

    if (
        !warehouse_id ||
        !item_name ||
        !description ||
        !category ||
        !status ||
        !quantity
    ) {
        return {
            isValid: false,
            errorMessage: 'Missing at least one field; all fields are required.',
        };
    }

    const warehouseExists = await knex('warehouses')
        .where({ id: warehouse_id })
        .first();
    if (!warehouseExists) {
        return { 
            isValid: false, 
            errorMessage: 'This warehouse_id does not exist.' 
        };
    }

    const inventoryItemExists = await knex('inventories')
        .where({ item_name : item_name })
        .first();
    if (inventoryItemExists) {
        return {
            isValid: false,
            errorMessage: 'This inventory item already exists.',
        };
    }

    if (isNaN(quantity)) {
        return { 
            isValid: false, 
            errorMessage: 'Quantity must be a number.' 
        };
    }

    return { isValid: true };
};

module.exports = {
  validateUpdateInventory,
  validateNewInventoryData
};
