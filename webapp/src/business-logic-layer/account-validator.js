const MIN_USERNAME_LENGTH = 3
const MAX_USERNAME_LENGTH = 10
const bcrypt = require('bcryptjs')
module.exports = function({accountRepository}){
	return{
		getErrorsNewAccount:function(username, password){
	
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
			
		},
		
		validateAccount:function(username, password, callback){
			const errors = []
			accountRepository.checkIfExist(username, function(error, hash){
				if(error.length){
					callback(['databaseError'], null)
				}
				else{
					bcrypt.compare(password, hash, function(bcryptError, result){
						if(result){
						
							accountRepository.getAccountByUsername(username, callback)
						}
						else{
							
							callback(['Wrong'], null)
						}
					})
				}
		
			})
		}
		
			

	}
}
