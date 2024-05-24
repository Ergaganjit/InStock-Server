const router = require("express").Router();
const { check, validationResult } = require("express-validator");
const warehouseController = require("../controllers/warehouse-controller");
const inventoryController = require("../controllers/inventory-controller");

// middleware to validate warehouse data
const validateWarehouse = [
  check("warehouse_name").notEmpty().withMessage("Warehouse name is required"),
  check("address").notEmpty().withMessage("Address is required"),
  check("city").notEmpty().withMessage("City is required"),
  check("country").notEmpty().withMessage("Country is required"),
  check("contact_name").notEmpty().withMessage("Contact name is required"),
  check("contact_position")
    .notEmpty()
    .withMessage("Contact position is required"),
  check("contact_phone")
    .notEmpty()
    .withMessage("Contact phone is required")
    .matches(/^\+?1?[-. (]*\d{3}[-. )]*\d{3}[-. ]*\d{4}$/)
    .withMessage("Invalid phone number"),
  check("contact_email")
    .notEmpty()
    .withMessage("Contact email is required")
    .isEmail()
    .withMessage("Invalid email address"),
];

// Middleware to handle validation errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// warehouse router to get data and create a new warehouse
router
  .route("/")
  .get(warehouseController.getWarehouses)
  .post(
    validateWarehouse,
    handleValidationErrors,
    warehouseController.createWarehouse
  );

// warehouse router to delete data; get single warehouse
router
  .route("/:id")
  .delete(warehouseController.removeWarehouse)
  .get(warehouseController.getSingleWarehouse)
  .put(warehouseController.editWarehouse);

// warehouse router to get inventories for specific warehouse
router
  .route("/:id/inventories")
  .get(inventoryController.getInventoriesByWarehouseId);

module.exports = router;
