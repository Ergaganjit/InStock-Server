const knex = require("knex")(require("../knexfile"));


const validateUpdateInventory = async (req, res) => {
  const { warehouse_name, item_name, description, category, status, quantity } = req.body;
  const { id } = req.params;

  // Check if all required fields are present
  if (!warehouse_name || !item_name || !description || !category || !status || !quantity) {
    return { status: 400, message: 'All fields are required' };
  }

  // Check if quantity is a number
  if (status === 'In Stock' && (quantity === undefined || isNaN(quantity))) {
    return { status: 400, message: 'Quantity must be a number' };
  }

  try {
    // Check if the inventory ID exists
    const inventory = await knex('inventories').where({ id }).first();
    if (!inventory) {
      return { status: 404, message: 'Inventory ID not found' };
    }

    // Check if the warehouse name exists and get the warehouse ID
    const warehouse = await knex('warehouses').where({ warehouse_name }).first();
    if (!warehouse) {
      return { status: 400, message: 'Invalid warehouse name' };
    }

    return { status: 200, warehouseId: warehouse.id };
  } catch (error) {
    console.error(error);
    return { status: 500, message: 'An error occurred during validation' };
  }
};

module.exports = {
  validateUpdateInventory,
};
