
const db = require("./db")


//var accounts = sequelize.import('../seq/account-model.js')
//var movieposts = sequelize.import('../seq/movieposts-model.js')
//var comments = sequelize.import('../seq/comments-model.js')

//accounts.findAll().then(allAccounts => {console.log(allAccounts)})
//comments.findAll().then(allPosts => {console.log(allPosts)})

module.exports = function () {
	return {
		getAllPosts: function (callback) {

			console.log("test")
			db.posts.findAll().then(function(allPosts){		
				console.log(allPosts)		
				callback([], allPosts)
			})	
			.catch(function(error){
				console.log(error)
				callback(["databaseError"],null)
			})						
		},

		createPost: function (title, post, username, callback) {

			db.posts.create({title : title, post: post, username: username}).then(function(createdPost){
				console.log("created post: " + createdPost)		
				callback([], createdPost)
			  }).catch(function(error){
				console.log(error)
				callback(["databaseError"],null)
			  })

		},

		getPostWithId: function (postId, callback) {

			/*
			const query = "SELECT * FROM movieposts WHERE id = ?"

			db.query(query, id, function (error, results) {
				if (error) {
					callback(['databaseError'], null)
				}else{
					callback([], results)
				}
			})
			*/

			db.posts.findAll({
				where: {
					id : postId
				}
			}).then(function(post){
				console.log("Post: " + post)
				callback([], post)
			}).catch(function(error){
				console.log(error)
				callback(["databaseError"],null)
			})

			

		},

		getCommentsWithId: function (id, callback) {

			/*
			const query = "SELECT * FROM comments WHERE postId = ?"

			db.query(query, id, function (error, results) {
				if (error){
					callback(['databaseError'], null)
				}else{
					callback([], results)
				}
			})*/

			db.comments.findAll({

				where : {
					postId : id
				}
			}).then(function(comment){
				console.log("Comment: " + comment)
				callback([], comment)
			}).catch(function(error){
				console.log(error)
				callback(["databaseError"],null)
			})


		},

		/*
		getUserPosts: function(username, callback){

			const query = "SELECT * FROM movieposts WHERE username ="

			db.query(query, username, function(error, results){
				if (error){
					callback(['databaseError'], null)
				}else{
					callback([], results)
				}
			})
		},

		*/

		commentOnPostWithId: function (id, commentToPost, usernameThatPosted, callback) {


			/*
			const query = "INSERT INTO comments (comment, postId, username) VALUES (?,?,?)"
			const values = [comment, id, username]

			db.query(query, values, function (error, results) {
				if (error) {
					callback(['databaseError'], null)
				}else{
					callback([], results)
				}
			})*/

			//movieposts.create({title : title, post: post, username: username}

			db.comments.create({comment : commentToPost, username : usernameThatPosted, postId : id})
			.then(function(comment){
				console.log("Comment: " + comment)
				callback([], comment)
			}).catch(function(error){
				console.log(error)
				callback(["databaseError"],null)
			})
		}

	}
}


