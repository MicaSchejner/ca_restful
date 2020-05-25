
const _ = require('underscore');
const fs = require('fs');
const alumnoModel = require('./../models/alumnoModel');

exports.getAlumnos = (req, res) => {
    const alumnos = JSON.parse(fs.readFileSync('./datos/alumnosDatos.json'));
    if (_.isEmpty(req.query)) {
        res.status(200).json({
            "alumnos" : alumnos 
          });
    } else {
        if(req.query.edadMin && req.query.edadMax){
            var resRango = alumnos.map(alumnoRango => {
                if(alumnoRango.edad >= req.query.edadMin && alumnoRango.edad <= req.query.edadMax)
                    return alumnoRango
            }).filter(alumnoRango => !_.isEmpty(alumnoRango));
            res.status(200).json({
                "cantidad" : Object.keys(resRango).length,
                "alumnos" : resRango 
              });
        }else{
            var error = {};
            error.mensaje = 'Parámetros incorrectos';
            res.status(400).json({"mensaje" : error});
        }
        
    }
}

exports.getAlumnosPorDni = (req, res,next) => {
    try{
        const alumnos = JSON.parse(fs.readFileSync('./datos/alumnosDatos.json'));
        const alumno = alumnos.find(alumno => alumno.dni === Number(req.params.dni));
        if (!alumno) {
            var error = {};
            error.mensaje = 'Alumno no encontrado';
            res.status(404).json({"mensaje" : error});
        }else{
            res.status(200).json({
                "alumno" : alumno 
              });
        }     

    }catch(e){
        next(e);
    }

}

exports.agregarAlumnos = (req, res, next) => {

    try {
        const alumnos = JSON.parse(fs.readFileSync('./datos/alumnosDatos.json'));
        const alumno = alumnos.find(alumno => alumno.dni === Number(req.body.dni));
        if (alumno) {
            var error = {};
            error.mensaje = 'Alumno ya existe';
            res.status(403).json({"mensaje" : error});
        }else{

            var alumnoValidacion =  alumnoModel.validarAlumno(req.body);

            if (alumnoValidacion.error) {
                var error = {};
                error.mensaje = 'Request incorrecto';
                res.status(400).json({"mensaje" : error});
                
            }else{
                alumnos.push(alumnoValidacion.alumno);
                fs.writeFileSync('./datos/alumnosDatos.json', JSON.stringify(alumnos));
                res.status(201).json({
                    "mensaje" : "Alumno creado correctamente",
                    "alumno" : alumnoValidacion.alumno 
                    });

            }
            
        }
        
      } catch (e) {
        next(e);
      }
}

exports.modificarAlumnoPorId = (req, res,next) => {

    try {
        const alumnos = JSON.parse(fs.readFileSync('./datos/alumnosDatos.json'));
        const alumno = alumnos.find(alumno => alumno.id === Number(req.params.id));
        if (!alumno) {
            var error = {};
            error.mensaje = 'Alumno no encontrado';
            res.status(404).json({"mensaje" : error});
        }else{
            const nuevaDataAlumno = {
                id: alumno.id,
                nombre: req.body.nombre,
                apellido: req.body.apellido,
                dni: req.body.dni,
                edad: req.body.edad,
              };

              var alumnoValidacion =  alumnoModel.validarAlumno(nuevaDataAlumno);
              
              const modificacion = alumnos.map(alumnoModificado => {
                    if (alumnoModificado.id === Number(req.params.id)) {
                        return alumnoValidacion.alumno;
                    } else {
                        return alumnoModificado;
                    }
                });
                
              if (alumnoValidacion.error) {
                  var error = {};
                  error.mensaje = 'Request incorrecto';
                  res.status(400).json({"mensaje" : alumnoValidacion.resultado});
                  
              }else{
                    fs.writeFileSync('./datos/alumnosDatos.json', JSON.stringify(modificacion));
                    res.status(201).json({
                        "mensaje": "Alumno actualizado correctamente",
                        "alumno" : modificacion
                    });
  
              }
              
        }
        
      } catch (e) {
        next(e);
      }
}



exports.deleteAlumnosPorId = (req, res, next) => {
    try {
        const alumnos = JSON.parse(fs.readFileSync('./datos/alumnosDatos.json'));
        const alumno = alumnos.find(alumno => alumno.id === Number(req.params.id));
        if (!alumno) {
            var error = {};
            error.mensaje = 'Alumno no encontrado';
            res.status(404).json(error);
        }else{
            const eliminacion = alumnos.map(alumnoEliminado => {
                if (alumnoEliminado.id === Number(req.params.id)) {
                    return null;
                } else {
                    return alumnoEliminado;
                }
            }).filter(alumnoEliminado => !_.isEmpty(alumnoEliminado));
            fs.writeFileSync('./datos/alumnosDatos.json', JSON.stringify(eliminacion));
            res.status(200).json({ "mensaje": 'Alumno eliminado correctamente'});
        }
        
      } catch (e) {
        next(e);
      }
}