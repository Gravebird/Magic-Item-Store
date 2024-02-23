const mysql = require("mysql2");

require("dotenv").config();

const pool = mysql.createPool({
    connectionLimit: 100,
    host: process.env.USER_DATA_DB_HOST,
    user: process.env.USER_DATA_DB_USER,
    password: process.env.USER_DATA_DB_PASSWORD,
    database: process.env.USER_DATA_DB_NAME
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

let user_data_controller = {

    getShopNamesOwnedByUser: async function(user_id) {
        theQuery = 'SELECT shop_name FROM shop WHERE user_id = ' + user_id;
        return await query(theQuery);
    },

    insertNewShop: async function(user_id, shop_name) {
        theQuery = `INSERT INTO Shop (user_id, shop_name) VALUES (${user_id},"${shop_name}")`;
        console.log(theQuery);
        return await query(theQuery);
    }
}

module.exports = user_data_controller;