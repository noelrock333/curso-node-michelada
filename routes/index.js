var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/pepito', function(req, res, next) {
  res.render('pepito', {
    title: 'Otra cosa',
    nuevo: null,
    numero: 1
  });
});

router.get('/formulario', function(req, res, next) {
  res.render('formulario');
});

router.post('/nuevo', (req, res, next) => {
  const { nombre, edad } = req.body;

  fs.writeFile('datos.json', JSON.stringify(req.body), (err) => {
    if (!err) {
      res.send(`Se ha guardado satisfactoriamente`);
    } else {
      res.send('No se pudo guardar el usuario');
    }
  });
})

module.exports = router;
