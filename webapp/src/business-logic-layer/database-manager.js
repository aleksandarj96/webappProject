
module.exports = function({databaseFunctions}){
	return{
		getAllMoviePosts:function(callback){
			databaseFunctions.getAllMoviePosts(callback)
		},
		
		postMoviePost:function(title, post, username, callback){
			databaseFunctions.postMoivePost(title, post, username, callback)
		},
		
		getPostWithId:function(id, callback){
			databaseFunctions.getPostWithId(id, callback)
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
