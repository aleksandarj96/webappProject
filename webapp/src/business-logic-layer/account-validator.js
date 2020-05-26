const MIN_USERNAME_LENGTH = 3
const MIN_PASSWORD_LENGTH = 6
const MAX_USERNAME_LENGTH = 10
const bcrypt = require('bcryptjs')
module.exports = function({accountRepository}){
	return{
		getErrorsNewAccount:function(username, password){
			const errors = []
			if(!username){
				errors.push("usernameMissing")
			}else if(username.length < MIN_USERNAME_LENGTH){
				errors.push("username must be atleast 3 symbols")
			}
			return errors
			
		},
		
		validateAccount:function(username, password, callback){
			accountRepository.passwordByUsername(username, function(error, hash){
				if(error.length){
					callback(error, null)
				}
				else{
					bcrypt.compare(password, hash, function(bcryptError, result){
						if(result){
							accountRepository.getAccountByUsername(username, callback)
						}
						else{
							callback(['Wrong credentials'], null)
						}
					})
				}
		
			})
		}
		
			

	}
}
