const MIN_USERNAME_LENGTH = 3
const MAX_USERNAME_LENGTH = 10

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