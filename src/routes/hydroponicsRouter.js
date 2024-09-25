const express = require('express');
const HydroponicsController = require('../controllers/hydroponicsController');
const verifyFirebaseToken = require('../middlewares/firebaseAccessTokenAuth.js');
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

module.exports = router;
