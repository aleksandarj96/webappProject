function getYourMovies() {

	fetch("http://192.168.99.100:8080/api/your-movies/"+userInfo.sub, {
		method: "GET",
		headers: {
			"Authorization": "Bearer " + accessToken
		},
	}).then(function (response) {
		return response.json()
	}).then(function (movieposts) {

		const ul = document.querySelector("#your-movie-page ul")
		ul.innerText = ""
		console.log(movieposts)
		for (const moviepost of movieposts) {
			const li = document.createElement("li")
			const a = document.createElement("a")
			const buttonDelete = document.createElement("a")
			const space = document.createElement("span")
			a.innerText = "Your moviepost title: "+moviepost.title
			buttonDelete.innerText = "delete"
			space.innerText = " "
			a.setAttribute("href", "/your-movie/" + moviepost.id)
			buttonDelete.setAttribute("href", "/delete-your-movie/" + moviepost.id)
			a.addEventListener("click", handleClickOnAnchor)
			a.addEventListener("click", handleClickOnAnchor)
			buttonDelete.addEventListener("click", handleClickOnAnchor)
			li.appendChild(a)
			li.appendChild(space)
			li.appendChild(buttonDelete)
			ul.appendChild(li)
			

		}
		

	}).catch(function (error) {
		console.log(error)
	})

}