const mysql = require('mysql')

const connection = mysql.createConnection({
	host     : 'database', 
	user     : 'root',
	password : 'theRootPassword',
	database : 'webAppDatabase'
})

module.exports = connection

/*
connection.connect((err) => {

	//var sql = "INSERT INTO movieposts (title, post, username) VALUES ('test testing', 'testing testing testing testing testing testing', 'Biff_Aleks96')"
	//var sql = "CREATE TABLE movieposts (title VARCHAR(50) NOT NULL, post VARCHAR(255) NOT NULL, username VARCHAR(30) NOT NULL)"
	//var sql = "SELECT * FROM movieposts"
	//var sql = "DROP TABLE movieposts"
	//var sql = "INSERT INTO accounts (username, password) VALUES ('Biff_Aleks96', '123')"

  	connection.query(sql, function (err, result, fields) {
   if (err) throw err;
   console.log(result);
  });
});

*/

