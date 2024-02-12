const mysql = require('mysql2');

require("dotenv").config();

const pool = mysql.createPool({
    connectionLimit: 100,
    host: process.env.DND_DATA_DB_HOST,
    user: process.env.DND_DATA_DB_USER,
    password: process.env.DND_DATA_DB_PASSWORD,
    database: process.env.DND_DATA_DB_NAME
});


function query(query) {
    return new Promise((resolve, reject) => {
        pool.getConnection(function (err, connection) {
            if (err) {
                reject(err); // Not connected!
                console.log(err);
            }

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

let dnd_data_controller = {

    getNonCoreBooks: async function() {
        return await query('SELECT Book_Name, Book_ID FROM Book WHERE Book_ID > 2');
    }
}

module.exports = dnd_data_controller;