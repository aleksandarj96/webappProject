module.exports = function ({db}) {
	return {
		getAllPosts: function (callback) {

			const query = "SELECT * FROM posts"
			const values = []

			db.query(query, values, function (error, posts) {
				if (error) {
					callback(['database Error'], null)
				} else {
					callback([], posts)
				}
			})
		},

		createPost: function (title, post, username, accountId, callback) {

			const query = "INSERT INTO posts (title, post, username, accountId) VALUES (?,?,?,?)"
			const values = [title, post, username, accountId]

			db.query(query, values, function (error, results) {
				if (error){
					callback(["dbError"])
				}
				callback([], results)
				
			})
		},
		editPost: function (post, id, title, callback){
			const query = "UPDATE posts SET post = ?, title = ? WHERE id = ?"
			const values = [post, title, id]
			db.query(query, values, function(error, results){
				if(error){
					callback(["dbError"])
				}
				callback([], results)
			})
		},

		deletePost: function ( id, callback) {
			const query = "DELETE FROM posts WHERE id = ?"
			const values = [id]
			db.query(query, values, function (error, results) {
				if (error) {
					callback(["database error"])
				} 
				callback([], results)
			})
		},
		getPostWithId: function (id, callback) {

			const query = "SELECT * FROM posts WHERE id = ?"

			db.query(query, id, function (error, results) {
				if (error){
					callback(["database error"], null)
				} 
				callback([], results)
			})
		},

		getPostWithAccountId: function (id, callback) {

			const query = "SELECT * FROM posts WHERE accountId = ?"

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
		

		commentOnPostWithPostId: function (id, comment, username, callback) {

			const query = "INSERT INTO comments (comment, postId, username) VALUES (?,?,?)"
			const values = [comment, id, username]

			db.query(query, values, function (error, results) {
				if (error){
					callback(["database error"], null)

				}
				callback([], results)
			})
		}

	}
}
