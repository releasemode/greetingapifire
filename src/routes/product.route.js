const express = require("express");
const router = express.Router();
const productController = require('../controllers/product.controller')

/** get all admin */
router.post('/create', productController.create);
router.put('/updateById', productController.updateById);
router.delete('/deleteById/:id', productController.deleteById);
router.get('/getAll', productController.getAll);
router.get('/getById/:id', productController.getById);


module.exports = router