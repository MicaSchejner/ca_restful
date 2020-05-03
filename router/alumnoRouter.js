var express = require('express');
var routerAlumno = express.Router();

// Require controller modules.
var alumno_controller = require('../controllers/alumnoController');


routerAlumno.route('/')
    .get(alumno_controller.getAlumnos)
    .post(alumno_controller.agregarAlumnos)

routerAlumno.route('/dni/:dni')
    .get(alumno_controller.getAlumnosPorDni)

routerAlumno.route('/:id')
    .put(alumno_controller.modificarAlumnoPorId)
    .delete(alumno_controller.deleteAlumnosPorId)


    

module.exports = routerAlumno;

