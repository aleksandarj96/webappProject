const express = require('express')


module.exports = function ({databaseManager}) {
	const router = express.Router()
	
	router.use(express.urlencoded({ extended: false }))

	router.get("/", function (request, response) {
		response.render("home.hbs")
	})

	router.get("/about", function (request, response) {
		response.render("about.hbs")
	})

	router.get("/contact", function (request, response) {
		response.render("contact.hbs")

	})

	router.get("/movies", function (request, response) {
		databaseManager.getAllMoviePosts(function (errors, movieposts) {
			const model = {
				errors: errors,
				movieposts: movieposts,
				login: request.session.login
			}
			response.render("movies.hbs", model)
		})
	})

	router.get("/new-post", function (request, response) {
		response.render("new-post.hbs")
	})

	router.get("/post/:id", function (request, response) {

		const id = request.params.id

		databaseManager.getPostWithId(id, function (error, movieposts) {
			databaseManager.getCommentsWithId(id, function (error, comments) {
				const model = {
					error: error,
					movieposts: movieposts,
					comments: comments
				}
				response.render("post/:id.hbs", model)
			})
		})
	})

	router.post("/post/:id", function (request, response) {

		const id = request.params.id
		const comment = request.body.comment
		databaseManager.getPostWithId(id, function (error, movieposts) {
			databaseManager.commentOnPostWithId(id, comment, request.session.account.username, function (error) {
				const model = {
					error: error,
					movieposts: movieposts
				}
				response.render("post.hbs", model)
			})
		})
	})

	router.post("/new-post", function (request, response) {

		const title = request.body.title
		const post = request.body.post
		const username = request.session.account.username

		databaseManager.postMoviePost(title, post, username, function (error) {
		})
		response.render("new-post.hbs")
	});


	return router
}