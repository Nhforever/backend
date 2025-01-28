const express = require('express');
const authenticateToken = require('../middleware/jwtAuth');
const { takeProduct,RemoveProduct } = require('../controllers/cartControllers');

const router = express.Router();

router.post('/takeProduct',authenticateToken, takeProduct);
router.delete('/removeProduct/:product_id',authenticateToken, RemoveProduct);


module.exports = router;