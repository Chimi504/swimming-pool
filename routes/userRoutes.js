const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/userController');
const { authenticate } = require('../middleware/auth');

// Show user dashboard
router.get('/userDashboard', authenticate, userCtrl.userDashboard);

router.post('/mark-interested/:id', authenticate, userCtrl.markInterested);
router.post('/mark-not-interested/:id', authenticate, userCtrl.markNotInterested);

router.get('/booking', authenticate, userCtrl.showBookingForm);
router.post('/booking', authenticate, userCtrl.submitBooking);

router.get('/myBooking', authenticate, userCtrl.viewBookings);

module.exports = router;

