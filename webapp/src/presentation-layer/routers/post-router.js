const express = require('express')



module.exports = function ({postManager, commentManager}) {
	const router = express.Router()
	
	router.use(express.urlencoded({ extended: false }))

	router.post("/post/:id", function (request, response) {

		const id = request.params.id
		const comment = request.body.comment
		postManager.getPostWithId(id, function (error, posts) {
			commentManager.commentOnPostWithPostId(id, comment, request.session.account.username, function (error) {
				const model = {
					error: error,
					posts: posts,
				}
				response.render('posts.hbs', model)
			})
		})
	})

	router.get("/posts", function (request, response) {
		postManager.getAllPosts(function (errors, posts) {
			console.log(posts[0]["posts"], "Hej din stora apa" , errors)
			const model = {
				errors: errors,
				posts: posts,
				login: request.session.login
			}
			response.render("posts.hbs", model)
		})
	})
	

	router.post("/new-post", function (request, response) {

		const title = request.body.title
		const post = request.body.post
		const username = request.session.account.username
		const accountId = request.session.account.id
		postManager.createPost(title, post, username, accountId, function (error) {
			const model = {
				newPost: 1
			}
			response.render("new-post.hbs", model)
		})
		
	})


	return router
}