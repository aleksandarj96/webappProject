
module.exports = function({databaseFunctions}){
	return{
		getAllMoviePosts:function(callback){
			databaseFunctions.getAllMoviePosts(callback)
		},
		
		postMoviePost:function(title, post, username, accountId, callback){
			databaseFunctions.postMoivePost(title, post, username, accountId, callback)
		},
		deleteMoviePost:function(id, accountId, callback){
			databaseFunctions.deleteMoviePost(id, accountId, errors)
			
		},
		getPostWithMovieId:function(id, callback){
			databaseFunctions.getPostWithMovieId(id, callback)
		},

		getPostWithAccountId:function(id, callback){
			databaseFunctions.getPostWithAccountId(id, callback)
		},

		editMoviePost:function(post, id, title, callback){
			databaseFunctions.editMoviePost(post, id, title, callback)
		},
		
		deleteMoviePost:function( id, callback){
			databaseFunctions.deleteMoviePost( id, callback)
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
