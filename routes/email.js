var express = require('express');
const { notificarCambioEstado } = require('../controllers/email.controller');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/notificar', notificarCambioEstado);

module.exports = router;
