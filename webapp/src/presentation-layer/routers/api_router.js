const express = require('express')

module.exports = function ({accountManager, accountValidator, databaseManager}) {

    const router = express.Router()
    
    router.post("/sign-up", module.exports = function (req, res, next) {
		const username = req.body.username
        const password = req.body.password
        if(username == null || password == null || username & password == null){
            res.status(400).end()
        }
		accountManager.createAccount(username, password, function (errors, accounts) {
			if(errors){
                res.status(400).end()
            }
            res.status(201).end()
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

    

}