let cachedPostId = null

function updateEditPostPage(postId) {

	cachedPostId = postId

	fetch("http://192.168.99.100:8080/api/your-movie/"+ postId, {
		method: "GET",
		headers: {
			"Authorization": "Bearer " + accessToken
		},
	}).then(function (response) {
		return response.json()
	}).then(function (posts) {

		document.getElementById("edit-post-title").value = posts.title
		document.getElementById("edit-post-content").value = posts.post

	}).catch(function (error) {
		console.log(error)
		alert(error)
	})

}

document.addEventListener("DOMContentLoaded", function () {

	const editPostForm = document.querySelector("#edit-post-page form")

	editPostForm.addEventListener("submit", function (event) {
		event.preventDefault();

		const title = document.getElementById("edit-post-title").value
		const content = document.getElementById("edit-post-content").value

		fetch("http://192.168.99.100:8080/api/your-post/" + cachedPostId, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				"Authorization": "Bearer " + accessToken
			},
			body: JSON.stringify({
				id: cachedPostId,
				title: title,
				post: content,
				accountId: userInfo.sub
			})
		}).then(function (response) {
			console.log(response)
		}).catch(function (error) {
			console.log(error)
		})

	})

})