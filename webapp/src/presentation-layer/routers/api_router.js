const express = require('express')
const jwt = require("jsonwebtoken")
const jwtSecret = "adfsdfsdfsdfsd"

module.exports = function ({
		accountManager,
		accountValidator,
		commentManager,
		postManager
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

		router.post("/account", function (req, res, next) {
			const username = req.body.username
			const password = req.body.password
			accountManager.createAccount(username, password, function (errors, accounts) {
				if (errors.length) {
					res.status(400).end()
					return
				}
				else if(accounts == null){
					res.status(400).end()
				}
				 else {
					res.status(200).end()
					return
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
			accountValidator.validateAccount(username, password, function (errors, account) {
				if (errors.length) {
					response.status(400).end()
				}
				else {
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
			postManager.createPost(title, post, username, accountId, function (error) {
				if (error.length) {
					response.status(400).end()
				} 
				else {
					response.status(201).end()
				}
			})
		})

		router.get("/posts", function (request, response) {
			postManager.getAllPosts(function (errors, posts) {
				if (errors.length) {
					response.status(400).end()
				} 
				else {
					response.status(200).json(posts)
				}

			})
		})
		
		router.delete("/delete-your-post/:id", function (request, response) {
			const id = request.params.id
			postManager.deletePost(id, function (error) {
				if (error.length) {
					response.status(400).end()
				} 
				else {
					response.status(200).end()
				}
			})
		})
		router.get("/your-post/:id", function(request, response){
			const id = request.params.id
			postManager.getPostWithId(id, function(errors, post){
				const accountId =  post.accountId
				if(errors.length){
					response.status(400).end()
				}
				else if(!request.payload || request.payload.accountId != accountId) {
					response.status(401).end()
					return
				}
				else(
					response.status(200).json(post)
				)
			})
		})		

		router.put("/your-post/:id", function (request, response) {
			const id = request.params.id
			const title = request.body.title
			const post = request.body.post
			postManager.getPostWithId(id, function(errors, dbPost){
				if(errors.length){
					response.status(400).end()
				}
			
				else{
					const accountId =  dbPost.accountId
					if (!request.payload || request.payload.accountId != accountId) {
						response.status(401).end()
						return
					}

					postManager.editPost(post, id, title, function (error) {
						if (error.length) {
							response.status(400).end()
							return
						} 
						else {
							response.status(200).end()
							return
						}
					})
				}
			})
			
		})
	
		router.get("/your-posts/:accountId", function (request, response) {
			const accountId = request.payload.accountId
			postManager.getPostWithAccountId(accountId, function (error, posts) {
				if (error.length) {
					response.status(400).end()
				} 
				else {
					response.status(200).json(posts)
				}
			})

		})

			return router
		}

