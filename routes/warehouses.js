const router = require('express').Router();
const warehouseController = require('../controllers/warehouse-controller');
const inventoryController = require('../controllers/inventory-controller');


// warehouse router to get data
router.route("/")
.get(warehouseController.getWarehouses);

// warehouse router to delete data; get single warehouse
router.route("/:id")
.delete(warehouseController.removeWarehouse)
.get(warehouseController.getSingleWarehouse);

// warehouse router to get inventories for specific warehouse
router.route("/:id/inventories")
.get(inventoryController.getInventoriesByWarehouseId);


module.exports = router;