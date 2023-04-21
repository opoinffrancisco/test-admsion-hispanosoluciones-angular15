var DBCONEXION = {};
const mysql = require('mysql');
let opcion =0;

var data_conexion = [{ 
    host: `${process.env.DB_HOST}`, 
	port: process.env.DB_PORT,// Para el desarrollo
    user: `${process.env.DB_USER}`,
    password: `${process.env.DB_PASSWORD}`,
    database: `${process.env.DB_NAME}`,
    connectionLimit: process.env.DB_CONNECTIONLIMIT
}];

DBCONEXION.iniciar_conexion = async function () {
	try {
		var pool = mysql.createPool(data_conexion[opcion]);
		return pool;

	} catch (error) {
		// Error al iniciar la conexión con la base de datos
		console.log(error)
	}
}

DBCONEXION.cerrar_conexion = async function (db) {
	try {
		if(db!=false){
			db.end()
		} else {
			// Ya ha sido cerrada la conexión
		}
	} catch (error) {
		// Error al cerrar la conexión con la base de datos
		console.log(error)
	}
}



module.exports = DBCONEXION;