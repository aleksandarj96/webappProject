const bcrypt = require('bcryptjs')
const saltRounds = 10;
module.exports = function({accountRepository, accountValidator}){
	return{
		getAllAccounts:function(callback){
			accountRepository.getAllAccounts(callback)
		},
		
		createAccount:function(username, password, callback){
			const errors = accountValidator.getErrorsNewAccount(username, password)
			if(0 < errors.length){
				callback([errors], null)
			}
			bcrypt.hash(password, saltRounds, function (err, hash) {
				accountRepository.createAccount(username, hash, callback)
				console.log("Bcrypt")
			})
			
			
		},
		
		getAccountByUsername:function(username, callback){
			accountRepository.getAccountByUsername(username, callback)
		}
		
		

	}
}
