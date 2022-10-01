
const mysql = require('mysql');


const pool = mysql.createPool({
    connectionLimit: 100,
    host: 'localhost',
    user: 'magic_item_store',
    password: 'A00768125',
    database: 'mis_user_data'
});


function query(query) {
    return new Promise((resolve, reject) => {
        pool.getConnection(function (err, connection) {
            if (err) reject(err); // Not connected!

            connection.query(query, function (error, results, fields) {
                connection.release();

                if (error) reject(err);
                resolve(results);
            });
        });
    }).catch(function(error) {
        console.log("DB query error: " + error);
    });
}

let user_data_controller = {

    authenticate_user: async function (username, password) {
        sql_query = mysql.format("SELECT id FROM users WHERE username = ? AND password = MD5(?);",
        [username, password]);
        return await query(sql_query);
    }
}

module.exports = user_data_controller;