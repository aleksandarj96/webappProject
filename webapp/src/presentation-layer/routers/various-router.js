const express = require('express')


module.exports = function ({postManager, commentManager}) {
	const router = express.Router()
	
	router.use(express.urlencoded({ extended: false }))

	router.get("/", function (request, response) {
		const model = {
			account: request.session.account,
			login: request.session.login
		}
		response.render("home.hbs", model)
	})

	router.get("/about", function (request, response) {
		response.render("about.hbs", {login: request.session.login})
	})

	router.get("/contact", function (request, response) {
		response.render("contact.hbs", {login: request.session.login})

	})

	router.get("/signedOut", function(request, response){
		request.session.destroy()
		response.render("signedOut.hbs")
	})

	router.get("/new-post", function (request, response) {
		if(request.session.login == true){
			response.render("new-post.hbs", {login: request.session.login})
		}
		else{
			response.redirect("/accounts/sign-in")
		}
		
	})

	router.get("/post/:id", function (request, response) {
		const id = request.params.id
		postManager.getPostWithId(id, function (error, post) {
			commentManager.getCommentsWithId(id, function (error, comments) {
				const model = {
					error: error,
					posts: post,
					comments: comments,
					login: request.session.login
				}				
				response.render("post.hbs", model)
			})
		})
	})


	return router
}