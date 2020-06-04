const mysql = require('mysql')

const connection = mysql.createConnection({
	host     : '192.168.99.100', 
	user     : 'root',
	password : 'theRootPassword',
	database : 'webAppDatabase'
})

module.exports = connection
