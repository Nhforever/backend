const express = require('express');
const authenticateToken = require('../middleware/jwtAuth');
const { itemsOrder,allOrder,cancelOrder } = require('../controllers/orderControllers');

const router = express.Router();

router.post('/itemsOrder',authenticateToken, itemsOrder);
router.post('/allOrder',authenticateToken, allOrder);
router.delete('/cancelOrder/:order_id',authenticateToken,cancelOrder);

module.exports = router;