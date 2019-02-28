const accountRepository = require('../data-access-layer/account-repository')
const accountValidator = require('./account-validator')
const bcrypt = require('bcryptjs')
const saltRounds = 10;

exports.getAllAccounts = function(callback){
	accountRepository.getAllAccounts(callback)
}

exports.createAccount = function(username, password, callback){
	// Validate the account.
	const errors = accountValidator.getErrorsNewAccount(username, password)
		
        // Store hash in your password DB.
	if(0 < errors.length){
		console.log(errors)
		callback(errors, null)
		return
	}
	bcrypt.hash(password, saltRounds, function (err, hash) {
		accountRepository.createAccount(username, hash, callback)
	})
	
	
}

exports.getAccountByUsername = function(username, callback){
	accountRepository.getAccountByUsername(username, callback)
}

