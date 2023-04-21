// validation
const Joi = require('joi');

/**
 * Parametros
 * @username {string}
 * @email {string}
 * @contrasena {string}
 */
const schemaUsuario = Joi.object({
    nombre_completo: Joi.string().min(6).max(100).required(),
    nombre_empresa: Joi.string().min(2).max(100).required(),
    correo_electronico: Joi.string().min(6).max(100).required().email(),
    telefono: Joi.string().min(9).max(20).required(),
    id_categoria: Joi.string().min(1).max(11).required(),
    mensaje: Joi.string().min(2).max(255).required()
})


module.exports = {
    schemaUsuario
};