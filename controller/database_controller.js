const mysql = require('mysql');



const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'A00768125',
    database: 'DnD'
});


let databaseController = {
    connect: () => {
        con.connect((err) => {
            if (err) {
                console.log("Error connecting to Db");
                console.log(err);
                return;
            }
            console.log("Connection established");
        })
    },
    end: () => {
        con.end((err) => {
            // Connection is terminated gracefully
            // Ensures all remaining queries are executed
            // Then sends a quit packet to the MySQL server.
        });
    },
    test: () => {
        con.query('SELECT * FROM Spell WHERE "Electricity" IN (Spell_Descriptor)', (err, rows) => {
            if (err) throw err;

            console.log('Data received from Db:');
            console.log(rows);
            return rows;
        })
    }
};

module.exports = databaseController;