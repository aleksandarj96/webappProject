const express = require('express')
const accountManager = require('../../business-logic-layer/account-manager')

const router = express.Router()

router.get("/sign-up", function(request, response){
	response.render("accounts-sign-up.hbs")
})

router.get("/sign-in", function(request, response){
	response.render("accounts-sign-in.hbs")
})

router.post("/sign-up", function(request, response){
  
	const user = request.body.username
	const pass = request.body.password
	
	var account = {username: user, password: pass}
	
	accountManager.createAccount(account, function (error){	
	})
	  console.log(account.username, account.password)
	  response.render("new-post.hbs")
  });

router.get("/", function(request, response){
	accountManager.getAllAccounts(function(errors, accounts){
		console.log(errors, accounts)
		const model = {
			errors: errors,
			accounts: accounts
		}
		response.render("accounts-list-all.hbs", model)
	})
})

router.get('/:username', function(request, response){
	
	const username = request.params.username
	
	accountManager.getAccountByUsername(username, function(errors, account){
		const model = {
			errors: errors,
			account: account
		}
		response.render("accounts-show-one.hbs", model)
	})
	
})

module.exports = router