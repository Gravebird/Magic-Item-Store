const mysql = require('mysql');



const pool = mysql.createPool({
    connectionLimit: 100,
    host: 'localhost',
    user: 'root',
    password: 'A00768125',
    database: 'DnD'
});


function test() {
    return new Promise((resolve, reject) => {
        pool.getConnection(function(err, connection) {
            if (err) reject(err); // Not connected!

            connection.query('SELECT * FROM Spell WHERE Spell_School = "Necromancy"', function(error, results, fields) {
                connection.release();

                if (error) reject(err);
                console.log("Results from Db: ", results);
                resolve(results);
            });
        });
    });
}

module.exports = { test };