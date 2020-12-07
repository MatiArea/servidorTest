var express = require('express');
const { createPDF } = require('../controllers/pdf.controller');
var router = express.Router();

/* GET home page. */
router.post('/create', createPDF);

module.exports = router;
