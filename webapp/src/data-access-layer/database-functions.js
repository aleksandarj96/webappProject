const db = require('./db')

//lägg in alla databas funktioner här så skickas dom till businesss logic layer

exports.getAllMoviePosts = function(callback){

    const query = "SELECT * FROM movieposts"
    const values = []

    db.query(query, values, function(error, movieposts){
		if(error){
			callback(['databaseError'], null)
		}else{
			callback([], movieposts)
		}
	})
}

exports.postMoivePost = function(title, post, username){

	const query = "INSERT INTO movieposts (title, post, username) VALUES (?,?,?)"
	const values = [title, post, username]

	db.query(query, values, function (error, results){
		if(error) throw error;
		console.log("Inserted: ", values);
		//callback([], values)
	})
}

exports.getPostWithId = function(id, callback){

const query = "SELECT * FROM movieposts WHERE id = "+id+""

db.query(query, function(error, results){
	if(error) throw error;
	console.log("ID: ", results);
	callback([], results)
})
}

exports.getCommentsWithId = function(id, callback){

const query = "SELECT * FROM comments WHERE postId = "+id+""

db.query(query, function(error, results){
	if(error) throw error;
	console.log("COMMENT: ", results);
	callback([], results)
})
}

exports.commentOnPostWithId = function(id, comment, username, callback){

const query = "INSERT INTO comments (comment, postId, username) VALUES (?,?,?) WHERE postId = "+id+"" 
const values = [id, comment, username]

db.query(query, values, function(error, results){
	if(error) throw error;
	console.log("COMMENT: ", results);
	callback([], results)
	//callback([], values)
})
}