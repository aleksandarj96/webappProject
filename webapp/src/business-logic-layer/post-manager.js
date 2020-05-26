
module.exports = function({databaseFunctions}){
	return{
		
		getAllPosts:function(callback){	
			databaseFunctions.getAllPosts(function(error, results){
				if(error.length != 0){
					callback(["Database error"], null)
				}
				else{
					console.log("Business logic layer", results)
					callback([], results)
				}})	
			
		},
		
		createPost:function(title, post, username, accountId, callback){
			databaseFunctions.createPost(title, post, username, accountId, callback)
		},
		deletePost:function(id, accountId, callback){
			databaseFunctions.deletePost(id, accountId, callback)
			
		},
		getPostWithId:function(id, callback){
			databaseFunctions.getPostWithId(id, callback)
		},

		getPostWithAccountId:function(id, callback){
			databaseFunctions.getPostWithAccountId(id, callback)
		},

		editPost:function(post, id, title, callback){
			databaseFunctions.editPost(post, id, title, callback)
		},
		
		deletePost:function( id, callback){
			databaseFunctions.deletePost( id, callback)
		}
	}
}