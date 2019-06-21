
module.exports = function({databaseFunctions}){
	return{
		
		getCommentsWithId:function(id, callback){
			databaseFunctions.getCommentsWithId(id, callback)
		},
		
		commentOnPostWithPostId:function(id, comment, username, callback){
			if(username == null){
				callback(errors, null)
			}
			databaseFunctions.commentOnPostWithPostId(id,comment, username, callback)
		}

	}
}