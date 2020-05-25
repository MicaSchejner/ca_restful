const request = require("request-promise-native");

const crearCliente = (serverUrl,port) => {

    const apiPath = "/api/alumno";
    const resourceURI = `${serverUrl}:${port}${apiPath}`;

    const crearAlumno = async (estudiante) => {
        const postOpt = {
            method: 'POST',
            uri: resourceURI,
            json: true
        }

        if (estudiante) {
            postOpt.body = estudiante;            
        }
        return await request(postOpt);
    }

    return { crearAlumno };

}

exports.crearCliente = crearCliente;