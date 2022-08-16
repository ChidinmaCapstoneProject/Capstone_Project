const express = require('express');
const router = express.Router();
const places = require('../controllers/placeDetailsController');

router.get('/', async (req, res) =>{res.send( await places.getPlaceDetails(req, res))});

module.exports= router;
