const express = require('express');
const upload = require('../middleware/multer');
const authenticateToken = require('../middleware/jwtAuth');
const { editProduct,editConfig,active,inactive } = require('../controllers/editControllers');
const adminMiddleware = require('../middleware/admin');

const router = express.Router();

router.put('/editProduct/:product_id', authenticateToken,upload.single('product_pic'),adminMiddleware, editProduct);
router.put('/editConfig/:pc_id', authenticateToken,upload.single('config_pic'),adminMiddleware, editConfig);
router.put('/active/:pc_id',authenticateToken,active);
router.put('/inactive/:pc_id',authenticateToken,inactive);

module.exports = router;