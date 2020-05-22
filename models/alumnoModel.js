const Joi = require('@hapi/joi');

const validarAlumno = alumno => {
    const schema = Joi.object({
        id: Joi.number().integer().min(0),
        nombre: Joi.string().alphanum().min(1).required(),
        apellido: Joi.string().alphanum().min(1).required(),
        dni: Joi.number().integer().min(1).max(99999999999).required(),
        edad: Joi.number().integer().min(0).max(120).required(),
    });

    
    const result = schema.validate(alumno);

    if(result.error){
        return {error: true , resultado: result.error.message};
    }
    
    return {error: false , alumno: result.value};

}

exports.validarAlumno = validarAlumno;