var MODELO = {};
var timeout_ = 60000;


/**
 * 
 * @param {*} connection 
 * @param {*} datos : Filtros
 */
MODELO.getAll = async function(connection, datos)
{
    return new Promise((resolve, reject) => {

        try {

            var sql = `
            SELECT 
                u.*,
                c.nombre as categoria
            FROM usuarios AS u 
            INNER JOIN categoria AS c ON c.id = u.id_categoria
            WHERE u.eliminado=0 ORDER BY u.id desc`;
            connection.query(
                {
                    sql: sql, 
                    timeout: timeout_
                }, 
                async (error, resultado) => {
                    if (error) {
                        resolve(false);
                    } else{
                        resolve(resultado);
                    }
                }
            );
        }catch (error) {
            console.log(error)
            resolve(false);
        }
    });
}

/**
 * 
 * @param {*} connection 
 * @param {*} datos 
 */
MODELO.verificarExistencia = async function(connection, datos)
{
    return new Promise((resolve, reject) => {
        try {

            var sql = `SELECT * FROM usuarios WHERE correo_electronico=? AND eliminado=0 `;    
            connection.query(
                {
                    sql: sql, 
                    values : [datos.correo_electronico],
                    timeout: timeout_
                }, 
                async function (error, resultado) {
                    if (error) {
                        console.log("ERROR:", error);
                        resolve(false);
                    } else{
                        resolve(resultado);
                    }
                }
            );



        }catch (error) {
            console.log(error);
            resolve(false);
        }
    });
}

/**
 * 
 * @param {*} connection 
 * @param {*} datos 
 */
MODELO.crear = async function(connection, datos)
{    
    return new Promise((resolve, reject) => {
        try {
            var sql = ` INSERT INTO usuarios SET ? `;
            connection.query(
                sql, 
                {
                    nombre_completo : datos.nombre_completo,
                    nombre_empresa : datos.nombre_empresa,
                    correo_electronico : datos.correo_electronico,
                    telefono : datos.telefono,
                    id_categoria : datos.id_categoria,
                    mensaje : datos.mensaje
                }, 
                async function (error, resultado) {
                    if (error) {
                        console.log("ERROR:: MODELO.crear", error);
                        resolve(false);
                    } else{
                        //console.log("MODELO.crear - ID registrado: ", resultado.insertId);
                        resolve(resultado);
                    }
                }
            );


        }catch (error) {
            console.log(error)
            resolve(false);
        }                 
    });
}


module.exports = MODELO;