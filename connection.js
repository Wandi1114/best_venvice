var mysql  = require('mysql')

var con  = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "",
    database : "db_venvice"
});

con.connect((err) =>{
    if(err) throw err
    else console.log("Koneksi berhasil")
});

module.exports = con;