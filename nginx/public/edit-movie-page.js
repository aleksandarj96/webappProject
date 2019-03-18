let cachedMovieId = null

function updateEditMoviePage(moviePostId) {

	cachedMovieId = moviePostId

	fetch("http://192.168.99.100:8080/api/your-movie/"+ moviePostId, {
		method: "GET",
		headers: {
			"Authorization": "Bearer " + accessToken
		},
	}).then(function (response) {
		return response.json()
	}).then(function (moviePost) {

		document.getElementById("edit-movie-title").value = moviePost.title
		document.getElementById("edit-movie-post").value = moviePost.post

	}).catch(function (error) {
		console.log(error)
	})

}

document.addEventListener("DOMContentLoaded", function () {

	const editMovieForm = document.querySelector("#edit-movie-page form")

	editMovieForm.addEventListener("submit", function (event) {
		event.preventDefault();

		const title = document.getElementById("edit-movie-title").value
		const post = document.getElementById("edit-movie-post").value

		fetch("http://192.168.99.100:8080/api/your-movie/" + cachedMovieId, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				"Authorization": "Bearer " + accessToken
			},
			body: JSON.stringify({
				id: cachedMovieId,
				title: title,
				post: post,
				accountId: userInfo.sub
			})
		}).then(function (response) {
			console.log(response)
		}).catch(function (error) {
			console.log(error)
		})

	})

})