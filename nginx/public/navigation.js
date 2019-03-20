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
	else if(uri == "/posts"){
		id = "show-posts-page"
		updateShowMoviePage()
	}
	else if(uri == "/your-posts"){
		id = "your-post-page"
		getYourMovies()
	}
	else if (uri.startsWith("/your-post/")){
		const postId = parseInt(uri.split("/")[2])
		id = "edit-post-page"
		updateEditMoviePage(postId)
	}
	else if (uri.startsWith("/delete-your-post/")){
		const postId = parseInt(uri.split("/")[2])
		deleteMoviePage(postId)
	}
	
	document.getElementById(id).classList.add("current-page")
	
}