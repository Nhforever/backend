const express = require('express');
const upload = require('../middleware/multer');
const authenticateToken = require('../middleware/jwtAuth');
const { editProfilePic, editData,myData,orderHistory,getUsername,getAdmin } = require('../controllers/profileControllers');

const router = express.Router();

router.put('/editProfilePic',authenticateToken, upload.single('profile_pic'), editProfilePic);
router.put('/editData', authenticateToken, editData);
router.get('/myData',authenticateToken,myData);
router.get('/MyOrderHistory',authenticateToken,orderHistory);
router.get('/Myusername',authenticateToken,getUsername);
router.get('/getadmin',authenticateToken,getAdmin);

module.exports = router;