const express = require('express')

module.exports = function ({ accountManager, accountValidator }) {

	const router = express.Router()

	router.get("/sign-up", function (request, response) {
		response.render("accounts-sign-up.hbs")
	})

	router.get("/sign-in", function (request, response) {
		if (request.session.login == true) {
			const model = {
				account: request.session.account
			}
			response.render("home.hbs", model)
		}
		else {
			response.render("accounts-sign-in.hbs")
		}

	})
	router.post("/sign-up", module.exports = function (req, res, next) {
		const username = req.body.username
		const password = req.body.password
		accountManager.createAccount(username, password, function (errors, accounts) {
			const model = {
				errors: errors,
				accounts: accounts
			}
			res.render("accounts-sign-in.hbs", model)
		})
	})
	router.post("/sign-in", function (req, res, next) {
		const username = req.body.username
		const password = req.body.password
		accountValidator.validateAccount(username, password, function (err, account) {
			
			if (account == null) {
				
				res.redirect("/accounts/sign-in")
			}
			else {
				req.session.account = account
				req.session.login = true
				const model = {
					account: account
				}

				res.render("home.hbs", model)
			}
		})

	})

	router.get("/", function (request, response) {
		accountManager.getAllAccounts(function (errors, accounts) {
			const model = {
				errors: errors,
				accounts: accounts
			}
			response.render("accounts-list-all.hbs", model)
		})
	})

	router.get('/:username', function (request, response) {

		const username = request.params.username

		accountManager.getAccountByUsername(username, function (errors, account) {
			const model = {
				errors: errors,
				account: account
			}
			response.render("accounts-show-one.hbs", model)
		})

	})

	return router

}


