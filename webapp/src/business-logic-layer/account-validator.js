const MIN_USERNAME_LENGTH = 3
const MAX_USERNAME_LENGTH = 10
const bcrypt = require('bcryptjs')
const accountRepository = require('../data-access-layer/account-repository')

exports.getErrorsNewAccount = function(username, password){
	
	const errors = []
	
	// Validate username.
	if(username == ""){
		errors.push("usernameMissing")
	}else if(username.length < MIN_USERNAME_LENGTH){
		errors.push("usernameTooShort")
	}else if(MAX_USERNAME_LENGTH < username.length){
		errors.push("usernameTooLong")
	}
	
	return errors
	
}

exports.validateAccount = function(username, password, callback){
	const errors = []
	console.log("Validerar")
	accountRepository.checkIfExist(username, function(error, hash){
		console.log(hash + "Hashet" + password)
		if(error.length){
			console.log("Error finns inte i databasen")
			callback(['databaseError'], null)
		}
		else{
			bcrypt.compare(password, hash, function(bcryptError, result){
				if(result){
					console.log("Rätt lösenord")
					accountRepository.getAccountByUsername(username, callback)
				}
				else{
					console.log("Fel lösenord")
					callback(['Wrong'], null)
				}
			})
		}

	})
}

	