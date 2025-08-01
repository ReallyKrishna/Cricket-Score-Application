const express = require('express');
const router = express.Router();
const matchController = require('../controllers/matchController');

router.post('/matches/start', matchController.startMatch);
router.post('/matches/:id/commentary', matchController.addCommentary);
router.get('/matches/:id', matchController.getMatchDetails);

router.patch('/matches/:id/pause', matchController.pauseMatch);
router.patch('/matches/:id/resume', matchController.resumeMatch);

router.get('/matches', matchController.getAllMatches); // for frontend list

module.exports = router;
