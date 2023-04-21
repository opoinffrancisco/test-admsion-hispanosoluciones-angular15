var express = require(`express`);
var router = express.Router();
var bcrypt = require(`bcrypt`);

var DBCONEXION = require(`../mod/conexion`);
var CATEGORIAS = require(`../mod/categorias`);
var V = require(`./util/validaciones`);
var H = require(`./util/herramientas`);
var M = require(`./util/mensajes`);

const txtEntidad = `categoria`;

router.get(`/`,  async (req, res) => {
  
	var conexion_db = await DBCONEXION.iniciar_conexion();
	if (!conexion_db) {
		return res.status(200).json({
			error: true,
			mensaje: `${M.txtGenericos.errorConexionDB}`
		});
	}
	const categorias = await CATEGORIAS.getAll(conexion_db);
	if (categorias===false) return res.status(200).json({ error: true, mensajes: `${M.txtGenericos.errorEnBusquedas} ${txtEntidad}s` });

	DBCONEXION.cerrar_conexion(conexion_db);
	console.log(categorias)
	// Enviar respuesta
	res.json({
		"error" : false,
		"data": categorias 
		
	});
  
});


module.exports = router;
