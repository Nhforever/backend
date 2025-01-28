const express = require('express');
const authenticateToken = require('../middleware/jwtAuth');
const { deleteProduct,deleteConfig } = require('../controllers/deleteControllers');
const adminMiddleware = require('../middleware/admin');

const router = express.Router();

router.delete('/deleteProduct/:product_id', authenticateToken,adminMiddleware, deleteProduct);
router.delete('/deleteConfig/:pc_id', authenticateToken,adminMiddleware, deleteConfig);


module.exports = router;