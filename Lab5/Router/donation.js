const express = require('express');
const schemas = require('../schemas');
const donationsController = require('../Controller/donations');
const validate = require('../middlewares/validation');

const router = express.Router();


router.post("/", validate(schemas.donations.donateSchema), donationsController.createDonation);

router.post("/webhook", donationsController.webhook)


module.exports = router;
