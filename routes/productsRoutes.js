const express = require('express');
const authenticateToken = require('../middleware/jwtAuth');
const { Getproducts_others,Getproducts_all,Getconfig_active,Getconfig_all,Getproducts_cpus,Getproducts_motherboards,Getproducts_houses,Getproducts_gpus,Getproducts_rams,Getproducts_powersupplys,Getproducts_hdds,Getproducts_ssds,Getproducts_cpucoolers } = require('../controllers/productsControllers');
const adminMiddleware = require('../middleware/admin');

const router = express.Router();


router.get('/getProducts_others', authenticateToken, Getproducts_others);
router.get('/getProducts_all',authenticateToken, Getproducts_all);
router.get('/getConfig_active',authenticateToken,  Getconfig_active);
router.get('/getConfig_all', authenticateToken, Getconfig_all);
router.get('/getProducts_cpus', authenticateToken,Getproducts_cpus);
router.get('/getProducts_motherboards', authenticateToken,Getproducts_motherboards);
router.get('/getProducts_houses', authenticateToken,Getproducts_houses);
router.get('/getProducts_gpus', authenticateToken,Getproducts_gpus);
router.get('/getProducts_rams', authenticateToken,Getproducts_rams);
router.get('/getProducts_powersupplys', authenticateToken,Getproducts_powersupplys);
router.get('/getProducts_hdds', authenticateToken,Getproducts_hdds);
router.get('/getProducts_ssds', authenticateToken,Getproducts_ssds);
router.get('/getProducts_cpucoolers', authenticateToken,Getproducts_cpucoolers);

module.exports = router;