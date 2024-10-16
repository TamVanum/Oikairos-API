const express = require('express');
const HydroponicsController = require('../controllers/hydroponicsController.js');
const verifyFirebaseToken = require('../../middlewares/firebaseAccessTokenAuth.js');
const router = express.Router();

router.get('/me', verifyFirebaseToken , HydroponicsController.getHydroponicByUserIdInArray);
router.get('/', HydroponicsController.getAllHydroponics);
router.get('/:id', HydroponicsController.getHydroponicById);
router.post('/', HydroponicsController.createHydroponic);
router.patch('/:id', HydroponicsController.updateHydroponic);
router.delete('/:id', HydroponicsController.deleteHydroponic);
router.get('/user/:userId', HydroponicsController.getHydroponicByUserId);
router.get('/user/:userId/plants', HydroponicsController.getHydroponicsWithPlantsByUserId);
router.get('/metrics/:hydroponicId/in-use', HydroponicsController.getHydroponicMetricsInUse);
router.post('/plant/room', HydroponicsController.updatePlantHistoryRoomId);
router.post('/new-cycle', HydroponicsController.startNewPlantHistoryCicle);
router.post('/end-cycle', HydroponicsController.endPlantHistoryCicle);
// router.patch('/desactivate/:hydroponicId', HydroponicsController.desactivateHydroponic);

module.exports = router;
