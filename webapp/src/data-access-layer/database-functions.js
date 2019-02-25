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

	db.query(query, values, function (error){
		if(error) throw error;
		console.log("Inserted: ", values);
		//callback([], values)
	})
}