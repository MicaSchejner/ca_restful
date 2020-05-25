const alumnoPost = require("./alumno/alumnoPost");
const alumnoGet = require("./alumno/alumnoGet");
const alumnoPut = require("./alumno/alumnoPut");
const alumnoDelete = require("./alumno/alumnoDelete");

describe('POST Alumnos', () => {
    alumnoPost.crearAlumno(),
    alumnoPost.crearAlumnoExistente(),
    alumnoPost.crearAlumnoFaltante()
});

describe('GET Alumnos', () => {
    alumnoGet.buscarAlumnoPorDniOk,
    alumnoGet.buscarAlumnoPorDniError
});

describe('PUT Alumnos', () => {

});

describe('GET Alumnos', () => {

});
