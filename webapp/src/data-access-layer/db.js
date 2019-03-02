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
	//var sql = "CREATE TABLE comments (id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY, comment VARCHAR(255) NOT NULL, postId INT UNSIGNED NOT NULL)"
	var sql = "SELECT * FROM comments"
	//var sql = "DROP TABLE comments"
	//var sql = "INSERT INTO accounts (username, password) VALUES ('Biff_Aleks96', '123')"
	//var sql = "ALTER TABLE comments ADD FOREIGN KEY (username) REFERENCES movieposts(username)"
	//var sql = "ALTER TABLE comments ADD username VARCHAR(50)"
	//var sql = "INSERT INTO comments (comment, postId) VALUES ('TEST COMMENT', 1)"
  	connection.query(sql, function (err, result, fields) {
   if (err) throw err;
   console.log(result);
  });
});

*/

