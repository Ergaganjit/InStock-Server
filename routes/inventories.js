const router = require('express').Router();
const inventoryController=require('../controllers/inventory-controller');



// Inventory router to get data
router.route("/")
.get(inventoryController.getInventories);

// Inventory router to delete data
router.route("/:id")
.delete(inventoryController.removeInventory);

module.exports = router;