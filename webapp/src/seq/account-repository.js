const db = require("./db")

module.exports = function({}){
	return{
	getAllAccounts: function(callback){

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
	
	
	getAccountByUsername:function(usernameToFind, callback){


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

