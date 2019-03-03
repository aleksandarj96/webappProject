const db = require('./db')

/*
	Retrieves all accounts ordered by username.
	Possible errors: databaseError
	Success value: The fetched accounts in an array.
*/
exports.getAllAccounts = function(callback){
	
	const query = `SELECT * FROM accounts ORDER BY username`
	const values = []
	
	db.query(query, values, function(error, accounts){
		if(error){
			callback(['databaseError'], null)
		}else{
			callback([], accounts)
		}
	})
	
}
exports.getAllPasswords = function(callback){
	
	const query = `SELECT * FROM accounts ORDER BY username`
	const values = []
	
	db.query(query, values, function(error, accounts){
		if(error){
			callback(['databaseError'], null)
		}else{
			callback([], accounts)
		}
	})
	
}
exports.checkIfExist = function(username, callback){
	const query = `SELECT password FROM accounts WHERE username = ? `
	const values = [username]
	db.query(query, values, function(error, password){
		if(error){
			callback(['databaseError'], null)
		}else{
			callback([],password[0].password)
		}
	})
}

/*
	Retrieves the account with the given username.
	Possible errors: databaseError
	Success value: The fetched account, or null if no account has that username.
*/
exports.getAccountByUsername = function(username, callback){
	
	const query = `SELECT * FROM accounts WHERE username = ? LIMIT 1`
	const values = [username]
	
	db.query(query, values, function(error, accounts){
		if(error){
			callback(['databaseError'], null)
		}else{
			callback([], accounts[0])
		}
	})
	
}


exports.createAccount = function(username, password, callback){
	console.log("HEJ" + username + password)
	const query = `INSERT INTO accounts (username, password) VALUES (?, ?)`
	const values = [username, password]
	
	db.query(query, values, function(error, results){
		if(error){
			// TODO: Look for usernameUnique violation.
			callback(['databaseError'], null)
		}else{
			callback([], results.insertId)
		}
	})
	
}