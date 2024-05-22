const router = require('express').Router();
const inventoryController=require('../controllers/inventory-controller');



  // inventory controller
router.get('/',inventoryController.getInventories);


  
 
  module.exports = router;