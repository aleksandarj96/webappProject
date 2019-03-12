const express = require('express')
const jwt = require("jsonwebtoken")


module.exports = function ({accountManager, accountValidator}) {
	const router = express.Router()
    router.use(function(request, response, next){
		try{
			const authorizationHeader = request.get("Authorization")
			const accessTokenString = authorizationHeader.substr("Bearer ".length)
			request.payload = jwt.verify(accessTokenString, jwtSecret)
		}catch(e){
			console.log(e)
		}
		next()
	})
	
    router.post("/sign-up", module.exports = function (req, res, next) {
		const username = req.body.username
        const password = req.body.passwor
		accountManager.createAccount(username, password, function (errors, accounts) {
			if(errors){
                res.status(400).end()
            }
            res.status(201).end()
		})
	})
	router.post("/tokens", function(request, response){
		const grant_type = request.body.grant_type
		const username = request.body.username
		const password = request.body.password
		if(grant_type != "password"){
			response.status(400).json({error: "unsupported_grant_type"})
			return
		}
		accountValidator.validateAccount(username, password, function(error, account){
			if(account == null){
				respones.response(404).end()
			}
			else if (error.length){
				response.status(400).end()
			}
			else if(!account || account.password != password){
				response.status(400).json({
					error: "invalid_client"
				})
			}else{
				const accessToken = jwt.sign({
					accountId: account.id
				}, jwtSecret)
				const idToken = jwt.sign({
					sub: account.id,
					preferred_username: account.username
				}, "secret")
				
				response.status(200).json({
					access_token: accessToken,
					id_token: idToken
				})
			}
		})
	})
	router.get("/movies", function (request, response) {
		databaseManager.getAllMoviePosts(function (errors, movieposts) {
			if(errors.length){
				response.status(400).end()
			}
			else{
				response.status(200).json(movieposts)
			}
			
		})
	})

	return router
}