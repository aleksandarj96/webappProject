function handleClickOnAnchor(event){
	event.preventDefault()
	const uri = event.currentTarget.getAttribute("href")
	changePage(uri)
	console.log(uri)
	history.pushState({uri: uri}, "", uri)
}

document.addEventListener("DOMContentLoaded", function(){
	
	const anchors = document.querySelectorAll("a")
	
	for(const anchor of anchors){
		anchor.addEventListener("click", handleClickOnAnchor)
	}
	
})

history.replaceState({uri: "/"}, "", "/")

window.addEventListener('popstate', function(event){
	const state = event.state
	changePage(state.uri)
})

function changePage(uri){
	
	// Hide current page.
	document.querySelector(".current-page").classList.remove("current-page")
	
	// Display new page.
	let id
	
	if(uri == "/"){
		id = "home-page"
	}else if(uri == "/sign-up"){
		id = "sign-up-page"
	}else if(uri == "/sign-in"){
		id = "sign-in-page"
	}
	else if(uri == "/movies"){
		id = "show-movie-page"
		updateShowMoviePage()
	}
	else if(uri == "/your-movies"){
		id = "your-movie-page"
		getYourMovies()
	}
	else if (uri.startsWith("/your-movie/")){
		const movieId = parseInt(uri.split("/")[2])
		id = "edit-movie-page"
		updateEditMoviePage(movieId)
	}
	else if (uri.startsWith("/delete-your-movie/")){
		const movieId = parseInt(uri.split("/")[2])
		deleteMoviePage(movieId)
	}
	
	document.getElementById(id).classList.add("current-page")
	
}