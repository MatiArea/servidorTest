var express = require('express');
const { createPDF, createRecibo } = require('../controllers/pdf.controller');
var router = express.Router();

/* GET home page. */
router.post('/create', createPDF);
router.get('/recibo', createRecibo);


module.exports = router;
