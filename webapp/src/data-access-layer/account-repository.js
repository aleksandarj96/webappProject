
module.exports = function({db}){
	return{
	getAllAccounts: function(callback){
	
		const query = `SELECT * FROM accounts ORDER BY username`
		const values = []
		
		db.query(query, values, function(error, accounts){
			if(error){
				callback(['databaseError'], null)
			}else{
				callback([], accounts)
			}
		})
		
	},
/*
	getAllPasswords:function(callback){
		
		const query = `SELECT * FROM accounts ORDER BY username`
		const values = []
		
		db.query(query, values, function(error, accounts){
			if(error){
				callback(['databaseError'], null)
			}else{
				callback([], accounts)
			}
		})
		
	},*/
	checkIfExist:function(username, callback){
		const query = `SELECT password FROM accounts WHERE username = ? `
		const values = [username]
		db.query(query, values, function(error, password){
			if(error){
				callback([], error)
			}else{
				if(password.length > 0){
					callback([],password[0].password)
				}
				else{
					callback(['username doesnt exist'], null)
				}
				
			}
	
		})
	},
	
	getAccountByUsername:function(username, callback){
		
		const query = `SELECT * FROM accounts WHERE username = ? LIMIT 1`
		const values = [username]
		
		db.query(query, values, function(error, account){
			if(error){
				callback(["error"] , null)
			}else{
				callback([], account[0])
			}
		})
		
	},

	createAccount:function(username, password, callback){
		
		const query = `INSERT INTO accounts (username, password) VALUES (?, ?)`
		const values = [username, password]
		
		db.query(query, values, function(error, results){
			if(error){
				callback(['databaseError'], null)
			}else{
				callback([], results.insertId)
			}
		})
		
	}
}

}
/*
	Retrieves all accounts ordered by username.
	Possible errors: databaseError
	Success value: The fetched accounts in an array.
*/
