const express = require('express');
const router = express.Router();
const controller = require('../controllers/userController');

router.get('/users', controller.getUsers);
router.post('/users', controller.addUser);
router.post('/claim/:userId', controller.claimPoints);
router.get('/leaderboard', controller.getLeaderboard);
router.get('/history', controller.getHistory);

module.exports = router;
