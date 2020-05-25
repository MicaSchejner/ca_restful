const chai = require("chai");
const chaiHttp = require("chai-http");

const app = require("../../config/server");

chai.use(chaiHttp);

const buscarAlumnoPorDniOk = () => {
    it(`buscar alumno por DNI`, (done) => {
        chai.request(app.main())
            .get('/api/alumno/dni/12365478')
            .end((err, res) => {
                chai.expect(res).to.have.status(200);
                done();
            });
    });
}

const buscarAlumnoPorDniError = () => {
    it(`buscar alumno por DNI no encontrado`, (done) => {
        chai.request(app.main())
            .get('/api/alumno/dni/1278')
            .end((err, res) => {
                chai.expect(res).to.have.status(404);
                chai.expect(JSON.parse(res.text)).to.contain.keys('mensaje');
                done();
            });
    });
}

// const crearAlumnoFaltante = () => {
//     it(`Crear alumno con faltante de datos`, (done) => {
//         chai.request(app.main())
//             .get('/api/alumno')
//             .send({
//                 nombre: 'alumno',
//                 apellido: 'con faltante de datos',
//                 edad: 33
//             })
//             .end((err, res) => {
//                 chai.expect(res).to.have.status(400);
//                 chai.expect(JSON.parse(res.text)).to.contain.keys('mensaje');
//                 done();
//             });
//     });
// }





module.exports = {
    buscarAlumnoPorDniOk,
    buscarAlumnoPorDniError
};
