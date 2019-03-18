
function deleteMoviePage(movieId) {
    fetch("http://192.168.99.100:8080/api/delete-your-movie/" + movieId, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				"Authorization": "Bearer " + accessToken
			},
		}).then(function (response) {
            console.log(response)
            changePage("/movies")
		}).catch(function (error) {
			console.log(error)
        })
}
