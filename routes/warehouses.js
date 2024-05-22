const router = require('express').Router();
const warehouseController = require('../controllers/warehouse-controller');



// warehouse router to get data
router.route("/")
.get(warehouseController.getWarehouses);

// warehouse router to delete data
router.route("/:id")
.delete(warehouseController.removeWarehouse);





module.exports = router;