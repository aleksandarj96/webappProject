const express = require('express')
const databaseFunctions = require('../../business-logic-layer/database-manager')
const router = express.Router()


router.use(express.urlencoded({ extended: false }))

router.get("/", function(request, response){
	response.render("home.hbs")
})

router.get("/about", function(request, response){
	response.render("about.hbs")
})

router.get("/contact", function(request, response){
	response.render("contact.hbs")

})

router.get("/movies", function(request, response){
	databaseFunctions.getAllMoviePosts(function(errors, movieposts){
		console.log(errors, movieposts)
		const model = {
			errors: errors,
			movieposts: movieposts
		}
		response.render("movies.hbs", model)
	})
})

router.get("/new-post", function(request, response){	  
  response.render("new-post.hbs")
})

<<<<<<< HEAD
router.get("/post/:id", function(request, response){

	const id = request.params.id

	databaseFunctions.getPostWithId(id, function(error, movieposts){
		databaseFunctions.getCommentsWithId(id, function(error, comments){
		const model = {
		error: error,
		movieposts: movieposts,
		comments: comments
	}
		response.render("post.hbs", model)
})
})
})

router.post("/post/:id", function(request, response){

	const id = request.params.id
	const comment = request.body.comment
	databaseFunctions.getPostWithId(id, function(error, movieposts){
		databaseFunctions.commentOnPostWithId(id, comment, "aleks", function(error){
		const model = {
		error: error,
		movieposts: movieposts
	}
	response.render("post.hbs", model)
})
})
})

router.post("/new-post", function(request, response){
  
  const title = request.body.title
  const post = request.body.post
  const username = "Biff_Aleks96"

  databaseFunctions.postMoviePost(title, post, username ,function (error){	
  })
  	console.log(title, post, username)
	response.render("new-post.hbs")
});
=======
router.post("/new-post", require("./newpost"))
>>>>>>> 917ce574ea4aa6bea5d0d51c79602421f7dad3ca



module.exports = router