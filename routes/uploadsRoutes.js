const express = require('express');
const upload = require('../middleware/multer');
const authenticateToken = require('../middleware/jwtAuth');
const { uploadCategory, uploadProduct,uploadConfig } = require('../controllers/uploadsControllers');
const adminMiddleware=require('../middleware/admin')

const router = express.Router();

router.post('/uploadCategory', authenticateToken,adminMiddleware, uploadCategory);
router.post('/uploadProduct',authenticateToken, upload.single('product_pic'),uploadProduct);
router.post('/uploadConfig', authenticateToken,upload.single('config_pic') ,adminMiddleware,uploadConfig);


module.exports = router;