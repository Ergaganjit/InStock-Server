const router = require('express').Router();
const warehouseController = require('../controllers/warehouse-controller');



// warehouse controller
router.route("/").get(warehouseController.getWarehouses);
router.route("/:id")
.delete(warehouseController.removeWarehouse);





module.exports = router;