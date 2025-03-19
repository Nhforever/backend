const express = require('express');
const authenticateToken = require('../middleware/jwtAuth');
const { BuildpcCPU,BuildpcBOARD,BuildpcHOUSE,BuildpcGPU,BuildpcHDD,BuildpcSSD,BuildpcSUPPLY,BuildpcCOOLER,BuildPcCALCULATOR } = require('../controllers/buildControllers');
const router = express.Router();

router.post('/buildPc_cpu',authenticateToken,BuildpcCPU);
router.post('/buildPc_board',authenticateToken,BuildpcBOARD);
router.post('/buildPc_house',authenticateToken,BuildpcHOUSE);
router.post('/buildPc_gpu',authenticateToken,BuildpcGPU);
router.post('/buildPc_hdd',authenticateToken,BuildpcHDD);
router.post('/buildPc_ssd',authenticateToken,BuildpcSSD);
router.post('/buildPc_supply',authenticateToken,BuildpcSUPPLY);
router.post('/buildPc_cooler',authenticateToken,BuildpcCOOLER);

module.exports = router;