const databaseFunctions = require('../data-access-layer/database-functions')

//gör exports. likadant för alla databas funktioner så skickas dom vidare till presentaionlayer 

exports.getAllMoviePosts = function(callback){
	databaseFunctions.getAllMoviePosts(callback)
}

exports.postMoviePost = function(title, post, username, callback){
	databaseFunctions.postMoivePost(title, post, username, callback)
}

exports.getPostWithId = function(id, callback){
	databaseFunctions.getPostWithId(id, callback)
}

exports.getCommentsWithId = function(id, callback){
	databaseFunctions.getCommentsWithId(id, callback)
}

exports.commentOnPostWithId = function(id, callback){
	databaseFunctions.commentOnPostWithId(id, callback)
}