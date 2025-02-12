const express = require('express');
const authenticateToken = require('../middleware/jwtAuth');
const { itemsOrder,allOrder,cancelOrder,confirmOrder } = require('../controllers/orderControllers');

const router = express.Router();

router.post('/itemsOrder',authenticateToken, itemsOrder);
router.post('/allOrder',authenticateToken, allOrder);
router.delete('/cancelOrder/:order_id',authenticateToken,cancelOrder);
router.put('/confimrOrder/:order_id',authenticateToken,confirmOrder)

module.exports = router;