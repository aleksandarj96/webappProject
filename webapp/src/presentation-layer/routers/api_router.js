const express = require('express')

module.exports = function ({accountManager, accountValidator, databaseManager}) {

    const router = express.Router()
    router.get("/sign-up", function (request, response) {
		response.status(200).end()
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
    

}