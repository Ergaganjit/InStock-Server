const express = require('express');
const router = express.Router();



// const router = require('express').Router();
const inventoryController=require('../controllers/inventory-controller');



// Inventory router to get data
router.route("/")
.get(inventoryController.getInventories)
.post(inventoryController.addToInventory);

// Inventory router to delete data
router.route("/:id")
.put(inventoryController.updateInventory)
.delete(inventoryController.removeInventory);


// get single inventory item by id

const { getInventoryById } = require('../controllers/inventory-controller');
router.get('/:id', getInventoryById);

module.exports = router;