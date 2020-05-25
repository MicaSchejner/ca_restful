const chai = require("chai");
const chaiHttp = require("chai-http");

const app = require("../../config/server");

chai.use(chaiHttp);

const crearAlumno = () => {
    it(`insertar un alumno sin error`, (done) => {
        chai.request(app.main())
            .post('/api/alumno')
            .send({
                nombre: 'alumno',
                apellido: 'correcto',
                dni: '236478952',
                edad: 33
            })
            .end((err,res) => {
                chai.expect(res).to.have.status(201);
                done();
            });
    });
}

const crearAlumnoExistente = () => {
    it(`crear alumno existente`, (done) => {
        chai.request(app.main())
            .post('/api/alumno')
            .send({
                nombre: 'alumno',
                apellido: 'existente',
                dni: '256478952',
                edad: 33,
            })
            .end((err, res) => {
                chai.expect(res).to.have.status(403);
                chai.expect(JSON.parse(res.text)).to.contain.keys('mensaje');
                done();
            });
    });
}

const crearAlumnoFaltante = () => {
    it(`Crear alumno con faltante de datos`, (done) => {
        chai.request(app.main())
            .post('/api/alumno')
            .send({
                nombre: 'alumno',
                apellido: 'con faltante de datos',
                edad: 33
            })
            .end((err, res) => {
                chai.expect(res).to.have.status(400);
                chai.expect(JSON.parse(res.text)).to.contain.keys('mensaje');
                done();
            });
    });
}





module.exports = {
    crearAlumno, 
    crearAlumnoFaltante,
    crearAlumnoExistente
    };
