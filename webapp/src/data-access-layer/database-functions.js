module.exports = function ({db}) {
	return {
		getAllMoviePosts: function (callback) {

			const query = "SELECT * FROM movieposts"
			const values = []

			db.query(query, values, function (error, movieposts) {
				if (error) {
					callback(['databaseError'], null)
				} else {
					callback([], movieposts)
				}
			})
		},

		postMoivePost: function (title, post, username) {

			const query = "INSERT INTO movieposts (title, post, username) VALUES (?,?,?)"
			const values = [title, post, username]

			db.query(query, values, function (error, results) {
				if (error) throw error;
				//callback([], values)
			})
		},

		getPostWithId: function (id, callback) {

			const query = "SELECT * FROM movieposts WHERE id = ?"

			db.query(query, id, function (error, results) {
				if (error) throw error;
				callback([], results)
			})
		},

		getCommentsWithId: function (id, callback) {

			const query = "SELECT * FROM comments WHERE postId = ?"

			db.query(query, id, function (error, results) {
				if (error) throw error;
				callback([], results)
			})
		},

		commentOnPostWithId: function (id, comment, username, callback) {

			const query = "INSERT INTO comments (comment, postId, username) VALUES (?,?,?)"
			const values = [comment, id, username]

			db.query(query, values, function (error, results) {
				if (error) throw error;
				callback([], results)
				//callback([], values)
			})
		}

	}
}
//lägg in alla databas funktioner här så skickas dom till businesss logic layer

