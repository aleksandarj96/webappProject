function updateShowMoviePage(){
	
	fetch("http://192.168.99.100:8080/api/movies", {
		method: "GET",
		headers: {
			"Authorization": "Bearer "+accessToken
		},
	}).then(function(response){
		return response.json()
	}).then(function(movieposts){
		const ul = document.querySelector("#show-movie-page ul")
		ul.innerText = ""
		for(const movies of movieposts){
			const li = document.createElement("li")
			li.innerText = "Post title: "+ movies.title
			ul.appendChild(li)
		}		
	}).catch(function(error){
		console.log(error)
	})
	
}