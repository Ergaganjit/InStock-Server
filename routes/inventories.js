const express = require('express');
const router = express.Router();



// const router = require('express').Router();
const inventoryController=require('../controllers/inventory-controller');



// Inventory router to get data
router.route("/")
.get(inventoryController.getInventories);

// Inventory router to delete data
router.route("/:id")
.delete(inventoryController.removeInventory);


// get single inventory item by id

const { getInventoryById } = require('../controllers/inventory-controller');
router.get('/:id', getInventoryById);

module.exports = router;