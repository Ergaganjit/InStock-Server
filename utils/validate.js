const knex = require("knex")(require("../knexfile"));

const validateInventoryData = async (data) => {
    const { warehouse_id, item_name, description, category, status, quantity } = data;

    if (!warehouse_id || !item_name || !description || !category || !status || !quantity) {
        return { valid: false, message: "All fields are required." };
    }

    const warehouseExists = await knex("warehouses").where({ id: warehouse_id }).first();
    if (!warehouseExists) {
        return { valid: false, message: "warehouse_id does not exist." };
    }

    if (isNaN(quantity)) {
        return { valid: false, message: "Quantity must be a number." };
    }

    return { valid: true };
};

module.exports = {
    validateInventoryData
};
