const express = require('express');
const authenticateToken = require('../middleware/jwtAuth');
const { buildPc_cpu,buildPc_board,buildPc_house,buildPc_gpu,buildPc_hdd,buildPc_ssd,buildPc_supply,buildPc_cooler,deletePc_cpu,deletePc_board,deletePc_house,deletePc_gpu,deletePc_hdd,deletePc_ssd,deletePc_supply,deletePc_cooler } = require('../controllers/buildControllers');
const router = express.Router();

router.post('/buildPc_cpu',authenticateToken,buildPc_cpu);
router.put('/remove_cpu',authenticateToken,deletePc_cpu)
router.post('/buildPc_board',authenticateToken,buildPc_board);
router.put('/remove_board',authenticateToken,deletePc_board)
router.post('/buildPc_house',authenticateToken,buildPc_house);
router.put('/remove_house',authenticateToken,deletePc_house)
router.post('/buildPc_gpu',authenticateToken,buildPc_gpu);
router.put('/remove_gpu',authenticateToken,deletePc_gpu)
router.post('/buildPc_hdd',authenticateToken,buildPc_hdd);
router.put('/remove_hdd',authenticateToken,deletePc_hdd)
router.post('/buildPc_ssd',authenticateToken,buildPc_ssd);
router.put('/remove_ssd',authenticateToken,deletePc_ssd)
router.post('/buildPc_supply',authenticateToken,buildPc_supply);
router.put('/remove_supply',authenticateToken,deletePc_supply)
router.post('/buildPc_cooler',authenticateToken,buildPc_cooler);
router.put('/remove_cooler',authenticateToken,deletePc_cooler)

module.exports = router;