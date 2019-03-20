module.exports = function ({db}) {
	return {
		getAllPosts: function (callback) {

			const query = "SELECT * FROM movieposts"
			const values = []

			db.query(query, values, function (error, posts) {
				if (error) {
					callback(['database Error'], null)
				} else {
					callback([], posts)
				}
			})
		},

		createPost: function (title, post, username, accountId) {

			const query = "INSERT INTO movieposts (title, post, username, accountId) VALUES (?,?,?,?)"
			const values = [title, post, username, accountId]

			db.query(query, values, function (error) {
				if (error){
					callback(["dbError"])
				}
				
			})
		},
		editPost: function (post, id, title, callback){
			const query = "UPDATE movieposts SET post = ?, title = ? WHERE id = ?"
			const values = [post, title, id]
			db.query(query, values, function(error){
				if(error){
					callback(["dbError"])
				}
			})
		},

		deletePost: function ( id, callback) {
			const query = "DELETE FROM movieposts WHERE id = ?"
			const values = [id]
			db.query(query, values, function (error) {
				if (error) {
					callback(["database error"])
				} 
			})
		},
		getPostWithId: function (id, callback) {

			const query = "SELECT * FROM movieposts WHERE id = ?"

			db.query(query, id, function (error, results) {
				if (error){
					callback(["database error"], null)
				} 
				callback([], results)
			})
		},

		getPostWithAccountId: function (id, callback) {

			const query = "SELECT * FROM movieposts WHERE accountId = ?"

			db.query(query, id, function (error, results) {
				if (error){
					callback(["database error"], null)
				}
				callback([], results)
			})
		},


		getCommentsWithId: function (id, callback) {

			const query = "SELECT * FROM comments WHERE postId = ?"

			db.query(query, id, function (error, results) {
				if (error){
					callback(["database error"], null)
				}
				callback([], results)
			})
		},
		

		commentOnPostWithId: function (id, comment, username, callback) {

			const query = "INSERT INTO comments (comment, postId, username) VALUES (?,?,?)"
			const values = [comment, id, username]

			db.query(query, values, function (error) {
				if (error){
					callback(["database error"])
				}
			})
		}

	}
}
