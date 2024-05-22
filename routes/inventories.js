const router = require('express').Router();
const inventoryController=require('../controllers/inventory-controller');



  // inventory controller
router.get('/',inventoryController.index);


  
 
  module.exports = router;