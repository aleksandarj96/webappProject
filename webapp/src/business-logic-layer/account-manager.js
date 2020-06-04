const bcrypt = require('bcryptjs')
const saltRounds = 10
module.exports = function ({
	accountRepository,
	accountValidator
}) {
	return {
		getAllAccounts: function (callback) {
			accountRepository.getAllAccounts(callback)
		},

		getAccountByUsername: function (username, callback) {
			accountRepository.getAccountByUsername(username, callback)
		},

		createAccount: function (username, password, callback) {

			accountValidator.getErrorsNewAccount(username, password, function (errors) {
				if (errors.length > 0) {
					callback(errors, null)
				} else {
					bcrypt.hash(password, saltRounds, function (err, hash) {
						accountRepository.createAccount(username, hash, callback)
					})
				}
			})
		},
	}
}