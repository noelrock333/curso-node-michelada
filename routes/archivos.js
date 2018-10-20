var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Esta es la ruta principal de /archivos');
});

router.get('/leer', function(req, res, next) {
  var datos = fs.readFileSync('datos.json', 'utf8');
  res.render('archivos/leer', JSON.parse(datos));
});

module.exports = router;