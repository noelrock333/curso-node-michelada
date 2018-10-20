var express = require('express');
var router = express.Router();
var fs = require('fs');
var exec = require('child_process').exec;
var os = require('os');
var knex = require('knex');
var knexFile = require('../knexfile');
var db = knex(knexFile[process.env.NODE_ENV || 'development']);

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

  db('usuarios')
    .insert({ nombre, edad })
    .catch(err => {
      console.log(err);
    }).then(data => {
      console.log(data);
      res.redirect('/usuarios');
    });

  // fs.writeFile('datos.json', JSON.stringify(req.body), (err) => {
  //   if (!err) {
  //     res.send(`Se ha guardado satisfactoriamente`);
  //   } else {
  //     res.send('No se pudo guardar el usuario');
  //   }
  // });
});

router.get('/usuarios', (req, res, next) => {
  db('usuarios')
    .select('*')
    .then(data => {
      // res.json(data);
      res.render('usuarios', { usuarios: data });
    })
})

function authentication(req, res, next) {
  if (req.params.id == 1) {
    res.send('Usuario prohibido');
  } else {
    next();
  }
}

router.get('/user/:id/show', authentication, (req, res, next) => {
  db('usuarios')
    .select('*')
    .where({ id: req.params.id })
    .then(user => {
      res.render('archivos/leer', user[0]);
    })
})

router.get('/comandos', (req, res, next) => {
  // os.platform()
  const { cmd } = req.query;
  exec(cmd, function(error, stdout, stderr){
      console.log(stdout);
      res.send(stdout);
  });
})

module.exports = router;
