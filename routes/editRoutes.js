const express = require('express');
const upload = require('../middleware/multer');
const authenticateToken = require('../middleware/jwtAuth');
const { editProduct,editConfig } = require('../controllers/editControllers');
const adminMiddleware = require('../middleware/admin');

const router = express.Router();

router.put('/editProduct/:product_id', authenticateToken,upload.single('product_pic'),adminMiddleware, editProduct);
router.put('/editConfig/:pc_id', authenticateToken,upload.single('config_pic'),adminMiddleware, editConfig);


module.exports = router;