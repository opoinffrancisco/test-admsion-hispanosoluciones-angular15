var express = require(`express`);
var router = express.Router();
var bcrypt = require(`bcrypt`);

var DBCONEXION = require(`../mod/conexion`);
var USUARIOS = require(`../mod/usuarios`);
var V = require(`./util/validaciones`);
var H = require(`./util/herramientas`);
var M = require(`./util/mensajes`);

const txtEntidad = `usuario`;

router.get(`/`,  async (req, res) => {
  
	var conexion_db = await DBCONEXION.iniciar_conexion();
	if (!conexion_db) {
		return res.status(200).json({
			error: true,
			mensaje: `${M.txtGenericos.errorConexionDB}`
		});
	}
	const usuarios = await USUARIOS.getAll(conexion_db, req.body);
	if (usuarios===false) return res.status(200).json({ error: true, mensaje: `${M.txtGenericos.errorEnBusquedas} ${txtEntidad}s` });

	DBCONEXION.cerrar_conexion(conexion_db);
	console.log(usuarios)
	// Enviar respuesta
	res.json({
		"error" : false,
		"data": usuarios 
		
	});
  
});

router.post(`/guardar`,   async (req, res) => {

	// Validaciones
	//console.log(req.body, req.query, req.params)
	const { error } = V.schemaUsuario.validate(req.body);
	if (error) return res.status(200).json({  error: true, mensaje: error.details[0].message })

	var conexion_db = await DBCONEXION.iniciar_conexion();
	if (!conexion_db) {
		return res.status(200).json({
			error: true,
			mensaje: `${M.txtGenericos.errorConexionDB}`
		});
	}

	const verificarExistencia = await USUARIOS.verificarExistencia(conexion_db, req.body);
	if (verificarExistencia!=false || verificarExistencia.length>0 ) return res.status(200).json({ error: true, mensaje: `${M.txtGenericos.errorYaExiste} ${txtEntidad}` });


	const nuevoRegistro = await USUARIOS.crear(conexion_db, req.body);
	if (nuevoRegistro===false) return res.status(200).json({ error: true, error: `${M.txtGenericos.errorRegistro}` });	

	DBCONEXION.cerrar_conexion(conexion_db);

	res.json({
		error : false,
		mensaje : ` ${M.txtGenericos.registroCorrecto} `
	});
	
	
});


module.exports = router;
