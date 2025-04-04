const express = require('express');
const authenticateToken = require('../middleware/jwtAuth');
const { takeProduct,RemoveProduct, ShowCart } = require('../controllers/cartControllers');
const router = express.Router();

router.post('/takeProduct/:product_id',authenticateToken, takeProduct);
router.delete('/removeProduct/:cart_item_id',authenticateToken, RemoveProduct);
router.get('/myCart',authenticateToken,ShowCart);

module.exports = router;