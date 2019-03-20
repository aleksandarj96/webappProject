const db = require("./db")



module.exports = function({}){
	return{
	getAllAccounts: function(callback){
	
		/*
		const query = `SELECT * FROM accounts ORDER BY username`
		const values = []
		
		db.query(query, values, function(error, accounts){
			if(error){
				callback(['databaseError'], null)
			}else{
				callback([], accounts)
			}
		})*/

		db.accounts.findAll({
			order : [
				['username', 'DESC']
			]
		}).then(function(accounts){
			console.log(accounts)
			callback([], accounts)
		}).catch(function(error){
			console.log(error)
			callback(['databaseError'], null)
		})
		
	},

	getAllPasswords:function(callback){
		
		/*
		const query = `SELECT * FROM accounts ORDER BY username`
		const values = []
		
		db.query(query, values, function(error, accounts){
			if(error){
				callback(['databaseError'], null)
			}else{
				callback([], accounts)
			}
		})*/

		
		db.accounts.findAll({
			order : [
				['username', 'DESC']
			]
		}).then(function(accounts){
			console.log(accounts)
			callback([], accounts)
		}).catch(function(error){
			console.log(error)
			callback(['databaseError'], null)
		})
		
	},
	checkIfExist:function(usernameToCheck, callback){
		
		/*
		
		const query = `SELECT password FROM accounts WHERE username = ? `
		const values = [username]
		db.query(query, values, function(error, password){
			if(error){
				callback(['databaseError'], null)
			}else{
				if(password.length > 0){
					callback([],password[0].password)
				}
				else{
					callback(['username doesnt exist'],null)
				}
				
			}
	
		}) */

		db.accounts.findAll({				
			where : {
				username : usernameToCheck,
			},
			attributes: ['password']
		}).then(function(password){
			if(password.length > 0){
				callback([],password[0].password)
			}else{
				callback(['username doesnt exist'],null)
			}
		}).catch(function(error){
			console.log(error)
			callback(["databaseError"],null)
		})


	},
	
	/*
		Retrieves the account with the given username.
		Possible errors: databaseError
		Success value: The fetched account, or null if no account has that username.
	*/
	getAccountByUsername:function(usernameToFind, callback){
		
		/*
		const query = `SELECT * FROM accounts WHERE username = ? LIMIT 1`
		const values = [username]
		
		db.query(query, values, function(error, accounts){
			if(error){
				callback(['databaseError'], null)
			}else{
				callback([], accounts[0])
			}
		})
		*/

		db.accounts.findOne({
			where : {
				username : usernameToFind,
			}
		}).then(function(account){
			console.log("found account: " + account )
			callback([], account)
		}).catch(function(error){
			console.log(error)
			callback(["databaseError"],null)
		})
		
	},
	
	/*
		Creates a new account.
		account: {username: "The username", password: "The password"}
		Possible errors: databaseError, usernameTaken
		Success value: The id of the new account.
	*/
	createAccount:function(username, password, callback){
		
		db.accounts.create({username: username, password: password}).then(function(createdAccount){
			console.log("created account: " + createdAccount)
			callback([], createdAccount)
					
		}).catch(function(error){
			console.log(error)
			callback(["databaseError"],null)
		})			

	}
}

}
/*
	Retrieves all accounts ordered by username.
	Possible errors: databaseError
	Success value: The fetched accounts in an array.
*/
