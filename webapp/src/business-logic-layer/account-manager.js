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
<<<<<<< HEAD
				console.log("IF SATS")	
				callback(errors)
				return errors		
			}else{
=======
				callback(errors, null)
			}
>>>>>>> ebce8edad45af3e9f4eb28baebc1ddab557a5794
			bcrypt.hash(password, saltRounds, function (err, hash) {
				accountRepository.createAccount(username, hash, callback)
				console.log("else SATS")
			})
		}
			
			
		},
		
		getAccountByUsername:function(username, callback){
			accountRepository.getAccountByUsername(username, callback)
		}
		
		

	}
}
