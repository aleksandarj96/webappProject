
const db = require("./db")


module.exports = function () {
	return {
		getAllPosts: function (callback) {
			db.posts.findAll({raw: true}).then(function(allPosts){	
				console.log(allPosts, "Hej hej hej")
				callback([], allPosts)
			
			})	
			.catch(function(error){
				console.log(error)
				callback(["databaseError"],null)
			})						
		},

		createPost: function (title, post, username, accountId, callback) {
			db.posts.create({title : title, post: post, username: username, accountId: accountId}).then(function(createdPost){
				console.log("created post: " + createdPost)		
				callback([], createdPost)
			  }).catch(function(error){
				console.log(error)
				callback(["databaseError"],null)
			  })

		},

		getPostWithId: function (id, callback) {
			db.posts.findOne({ 
				where: {
					id : id
				},
				raw: true
			}).then(function(post){
				console.log("Post: " + post)
				callback([], post)
			}).catch(function(error){
				console.log(error)
				callback(["databaseError"],null)
			})

			

		},
		getPostWithAccountId: function(id, callback){
			db.posts.findAll({
				where : {
					accountId: id
				}, raw: true
			}).then(function(post){
				callback([], post)
				
			}).catch(function(error){
				callback(["databaseError"], null)
			})
		},
		getCommentsWithId: function (id, callback) {

			db.comments.findAll({

				where : {
					postId : id
				}, raw: true
			}).then(function(comment){
				callback([], comment)
			}).catch(function(error){
				callback(["databaseError"],null)
			})


		},
		
		editPost: function (post, id, title, callback){
			db.posts.update(
				{
					post: post,
					title: title
				},
				{
					where : {
					id: id
				}
	
				}).then(function(){
					callback([])
				}).catch(function(error){
					callback(['dbError'])
				})
			
		},


		deletePost: function (id, callback) {
			db.posts.destroy(
				{
					where : {
					id: id
				}
	
				}).then(function(){
					callback([])
				}).catch(function(error){
					callback(['dbError'])
				})
		},


		commentOnPostWithPostId: function (id, commentToPost, usernameThatPosted, callback) {

			db.comments.create({comment : commentToPost, username : usernameThatPosted, postId : id})
			.then(function(comment){
				callback([], comment)
			}).catch(function(error){
				callback(["databaseError"],null)
			})
		}

	}
}


