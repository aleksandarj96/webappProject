const express = require('express')
const jwt = require("jsonwebtoken")
const jwtSecret = "adfsdfsdfsdfsd"

module.exports = function ({
	accountManager,
	accountValidator,
	databaseManager
}) {
	const router = express.Router()
	router.use(function (request, response, next) {
		try {
			const authorizationHeader = request.get("Authorization")
			const accessTokenString = authorizationHeader.substr("Bearer ".length)
			request.payload = jwt.verify(accessTokenString, jwtSecret)
		} catch (e) {
			console.log(e)
		}
		next()
	})

	router.post("/account", module.exports = function (req, res, next) {
		const username = req.body.username
		const password = req.body.password
		accountManager.createAccount(username, password, function (errors) {
			console.log(errors)
			if (errors.length) {
				res.status(400).end()
			}
			else{
				res.status(200).end()
			}
			
		})
	})
	router.post("/tokens", function (request, response) {
		const grant_type = request.body.grant_type
		const username = request.body.username
		const password = request.body.password
		if (grant_type != "password") {
			response.status(400).json({
				error: "unsupported_grant_type"
			})
			return
		}
		accountValidator.validateAccount(username, password, function (error, account) {
			if (account == null) {
				response.status(404).end()
			} else if (error.length) {
				response.status(400).end()
			} else {
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
	router.post("/new-post", function (request, response) {

		const title = request.body.title
		const post = request.body.post
		const accountId = request.body.accountId
		const username = request.body.username
		databaseManager.postMoviePost(title, post, username, accountId, function (error) {
			if (error.length) {
				response.status(400).end()
			} else {
				response.status(201).end()
			}
		})
	});

	router.get("/movies", function (request, response) {
		databaseManager.getAllMoviePosts(function (errors, movieposts) {
			if (errors.length) {
				response.status(400).end()
			} else {
				response.status(200).json(movieposts)
			}

		})
	})
	router.get("/your-movie/:id", function (request, response) {
		const id = request.params.id
		console.log("apa" + id + " " + request.payload.accountId)
		databaseManager.getPostWithMovieId(id, function (errors, moviepost) {
			if (errors.length) {
				response.status(500).end()
			} else {
				const accountId = moviepost.accountId
				if(!request.payload || request.payload.accountId != accountId){
					response.status(401).end()
					console.log("Ingen payload")
					return
				}
				else{
					response.status(200).json(moviepost)
				}
				
			}

		})
	})
	router.delete("/delete-your-movie/:id", function (request, response) {
			const id = request.params.id
			databaseManager.deleteMoviePost(id, function(error){
				if (error.length) {
					response.status(500).end()
				}
				else{
					response.status(200).end()
				}
	})
})
	router.put("/your-movie/:id", function (request, response) {
		const id = request.params.id
		const title = request.body.title
		const post = request.body.post
		databaseManager.getPostWithMovieId(id, function(error, moviepost){
			if(error.length){
				response.status(500).end()
				return
			}
			else{
				const accountId = moviepost.accountId
				if(!request.payload || request.payload.accountId != accountId){
					response.status(401).end()
					return
				}
				
				databaseManager.editMoviePost(post, id, title, function(error){
					if(error.length){
						response.status(500).end()
					}
				})
			}

		})
		databaseManager.editMoviePost(post, id, function(error){
			if (error.length){
				console.log(error)
				response.status(400).end()
			}
			else{
				response.status(200).end()
			}
		})
})

	router.get("/your-movies/:accountId", function(request, response){
		const accountId = request.payload.accountId
		console.log(accountId+"apa")
		databaseManager.getPostWithAccountId(accountId, function(error, movieposts){
			if(error.length){
				response.status(400).end()
			}
			else{
				response.status(200).json(movieposts)
				console.log(movieposts)
			}
		})

	})
	router.delete("/movies/:id", function(request, response){

		const id = request.params.id
		const accountId = request.payload.accountId
		if(!request.payload){
			response.status(401).end()
			return
		}
		databaseManager.deleteMoviePost(id, accountId, function(error){
			if(error.length){
				response.status(400).end()
			}
			else{
				response.status(200).end()
			}
		})
		
	})
	
	return router
}