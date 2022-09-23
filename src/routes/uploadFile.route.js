const express = require('express');
const router = express.Router();
const uploadFileController = require('../controllers/uploadFile.controller');

router.post('/productImage', uploadFileController.productImage);
module.exports = router;