const express = require("express");
const router = express.Router();

const adminController = require('../controllers/admin.controller');

/** get all admin */
router.post('/create', adminController.create);
router.put('/update', adminController.update);
router.delete('/deleteById/:id', adminController.deleteById);
router.get('/getAll', adminController.getAll);
router.get('/getById/:email', adminController.getById);

module.exports = router;