
module.exports = function({databaseFunctions}){
	return{
		getAllPosts:function(callback){
			databaseFunctions.getAllPosts(callback)
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
		},
		getCommentsWithId:function(id, callback){
			databaseFunctions.getCommentsWithId(id, callback)
		},
		
		commentOnPostWithId:function(id, comment, username, callback){
			if(username == null){
				callback(errors, null)
			}
			databaseFunctions.commentOnPostWithId(id,comment, username, callback)
		}

	}
}
