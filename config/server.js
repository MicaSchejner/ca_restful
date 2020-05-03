// import express from 'express';
const express = require("express");
const app = express();
const routerAlumnos = require('./../router/alumnoRouter');
const bodyParser = require('body-parser');


const puerto = 3000;    

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

/* rutas para alumnos */
app.use('/api/alumno',routerAlumnos);
/* FIN rutas para alumnos */

app.get('/', (req, res) => {
    res.status(200).send("Welcome to API REST")
  })


app.use((req, res, next) => {
  const err = new Error(`${req.method} ${req.url} Not Found`);
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message,
    },
  });
});

const server = app.listen(puerto, () => {
    console .log( `servidor inicializado en puerto ${server.address().port} ` );
});


