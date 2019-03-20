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
			if(errors.length){
				const model = {
					errors: errors
				}
				res.render("accounts-sign-up.hbs", model)
			}
<<<<<<< HEAD
			if (errors.length) {
				res.render("accounts-sign-up.hbs", model)
				console.log("IF SATS")
			} else {
				res.render("accounts-sign-in.hbs", model)
				console.log("ELSE SATS")
			}
=======
			else{
				res.redirect("/accounts/sign-in")
			}
			
>>>>>>> ebce8edad45af3e9f4eb28baebc1ddab557a5794
		})
	})
	router.post("/sign-in", function (req, res, next) {
		const username = req.body.username
		const password = req.body.password
		accountValidator.validateAccount(username, password, function (errors, account) {
			if (errors.length) {
				const model = {
					errors: errors,
				}
				res.render("accounts-sign-in.hbs", model)
			}
			else {
				req.session.account = account
				req.session.login = true
				const model = {
					account: account,
					login: req.session.login
				}
				res.render("home.hbs", model)
			}
		})

	})

	router.get("/", function (request, response) {
		accountManager.getAllAccounts(function (errors, accounts) {
			const model = {
				errors: errors,
				accounts: accounts,
				login: request.session.login
			}
			response.render("accounts-list-all.hbs", model)
		})
	})

	router.get('/:username', function (request, response) {

		const username = request.params.username

		accountManager.getAccountByUsername(username, function (errors, account) {
			const model = {
				errors: errors,
				account: account,
				login: request.session.login
			}
			response.render("accounts-show-one.hbs", model)
		})

	})

	return router

}


