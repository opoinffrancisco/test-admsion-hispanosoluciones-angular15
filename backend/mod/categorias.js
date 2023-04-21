var MODELO = {};
var timeout_ = 60000;


/**
 * 
 * @param {*} connection 
 */
MODELO.getAll = async function(connection)
{
    return new Promise((resolve, reject) => {

        try {

            var sql = `
            SELECT 
                *
            FROM  categoria 
            WHERE eliminado=0 ORDER BY id desc`;
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


module.exports = MODELO;