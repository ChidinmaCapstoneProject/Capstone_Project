const express = require('express')
const router = express.Router();
const bookingController = require('../controllers/bookingsController')

router.post('/', bookingController.handleNewBooking);
router.get('/', bookingController.getAllBookings);
router.delete('/:bookingId', bookingController.deleteBooking)

module.exports = router;
