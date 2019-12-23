var mysql = require("mysql");
var connection;
if (process.env.JAWSDB_URL) {
    connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
    connection = mysql.createConnection({
        host: "127.0.0.1",
        user: "root",
        password: "rootroot",
        database: "burger_db",
        port: 3306
    });
}
connection.connect(function (err) {
    if (err) {
        console.error("there was an error connecting" + err.stack);
        return;
    }
    console.log("connected to my Sql as id " + connection.threadId);
});

module.exports = connection