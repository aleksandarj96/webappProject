document.addEventListener("DOMContentLoaded", function(){
	
	const createMovieForm = document.querySelector("#create-movie-page form")
	
	createMovieForm.addEventListener("submit", function(event){
		event.preventDefault();
		
		const title = document.getElementById("create-movie-title").value
		const runtime = document.getElementById("create-movie-runtime").value
		
		fetch("http://192.168.99.100:8080/api/movies", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Authorization": "Bearer "+accessToken
			},
			body: JSON.stringify({title: title, runtime: runtime, accountId: userInfo.sub})
		}).then(function(response){
			console.log(response)
		}).catch(function(error){
			console.log(error)
		})
		
	})
	
})