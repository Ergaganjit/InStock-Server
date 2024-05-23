const router = require('express').Router();
const warehouseController = require('../controllers/warehouse-controller');



// warehouse router to get data
router.route("/")
.get(warehouseController.getWarehouses);

// warehouse router to delete data; get single warehouse
router.route("/:id")
.delete(warehouseController.removeWarehouse)
.get(warehouseController.getSingleWarehouse);


module.exports = router;