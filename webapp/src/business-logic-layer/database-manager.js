const databaseFunctions = require('../data-access-layer/database-functions')

//gör exports. likadant för alla databas funktioner så skickas dom vidare till presentaionlayer 

exports.getAllMoviePosts = function(callback){
	databaseFunctions.getAllMoviePosts(callback)
}

exports.postMoviePost = function(title, post, username, callback){
	databaseFunctions.postMoivePost(title, post, username, callback)
}
