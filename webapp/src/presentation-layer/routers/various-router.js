const express = require('express')


module.exports = function ({databaseManager}) {
	const router = express.Router()
	
	router.use(express.urlencoded({ extended: false }))

	router.get("/", function (request, response) {
		const model = {
			account: request.session.account
		}
		response.render("home.hbs", model)
	})

	router.get("/about", function (request, response) {
		response.render("about.hbs")
	})

	router.get("/contact", function (request, response) {
		response.render("contact.hbs")

	})

	router.get("/posts", function (request, response) {
		databaseManager.getAllPosts(function (errors, posts) {
			const model = {
				errors: errors,
				movieposts: posts,
				login: request.session.login
			}
			response.render("movies.hbs", model)
		})
	})

	router.get("/new-post", function (request, response) {
		if(request.session.login == true){
			response.render("new-post.hbs")
		}
		else{
			response.redirect("/accounts/sign-in")
		}
		
	})

	router.get("/post/:id", function (request, response) {
		const id = request.params.id
		const date = new Date();
		const current_hour = date.getHours();
		databaseManager.getPostWithId(id, function (error, posts) {
			databaseManager.getCommentsWithId(id, function (error, comments) {
				const model = {
					error: error,
					time: current_hour,
					movieposts: posts,
					comments: comments
				}
				response.render("post.hbs", model)
			})
		})
	})

	router.post("/post/:id", function (request, response) {

		const id = request.params.id
		const comment = request.body.comment
		databaseManager.getPostWithId(id, function (error, posts) {
			databaseManager.commentOnPostWithId(id, comment, request.session.account.username, function (error) {
				const model = {
					error: error,
					movieposts: posts
				}
				response.render("post.hbs", model)
			})
		})
	})

	router.post("/new-post", function (request, response) {

		const title = request.body.title
		const post = request.body.post
		const username = request.session.account.username
		const accountId = request.session.account.id

		databaseManager.createPost(title, post, username, accountId, function (error) {
		})
		response.render("new-post.hbs")
	});


	return router
}