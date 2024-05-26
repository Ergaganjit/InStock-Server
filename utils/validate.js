const knex = require("knex")(require("../knexfile"));

const validateInventoryData = async (data) => {
    const { warehouse_id, item_name, description, category, status, quantity } = data;

    if (!warehouse_id || !item_name || !description || !category || !status || !quantity) {
        return { valid: false, message: "All fields are required." };
    }

    const warehouseExists = await knex("warehouses").where({ id: warehouse_id }).first();
    if (!warehouseExists) {
        return { valid: false, message: "This warehouse_id does not exist." };
    }

    if (isNaN(quantity)) {
        return { valid: false, message: "Quantity must be a number." };
    }

    return { valid: true };
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
    validateInventoryData,
    validateNewInventoryData
};
