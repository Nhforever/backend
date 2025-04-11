const express = require('express');
const authenticateToken = require('../middleware/jwtAuth');
const { takeProduct,RemoveProduct, ShowCart, SUMprice,editQuantity } = require('../controllers/cartControllers');
const router = express.Router();

router.post('/takeProduct/:product_id',authenticateToken, takeProduct);
router.delete('/removeProduct/:cart_item_id',authenticateToken, RemoveProduct);
router.get('/myCart',authenticateToken,ShowCart);
router.get('/sumPrice',authenticateToken,SUMprice);
router.put('/editQuantity',authenticateToken,editQuantity);

module.exports = router;