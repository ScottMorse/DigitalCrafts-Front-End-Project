const saveButtons = Array.from(document.querySelectorAll('.save'))

function updateFavorites(){
    const favMovies = userDataRef.movies
    userFavorites.movie.forEach(movieFav => {
        //do stuff
    })
    userFavorites.restaurant.forEach(restaurantFav => {
        //do stuff
    })
    userFavorites.recipe.forEach(recipeFav => {
        //do stuff
    })
}

function addFavorite(){
    const splitId = this.id.split('-')
    const favType = splitId[0]
    const objInd = splitId[2]
    const fetchedObj = masterObject[favType][objInd]
    let name
    let category
    if(favType == "movie"){
        name = fetchedObj.title
        category = "movies"
    }
    else if(favType == "restaurant"){
        name = fetchedObj.name
        category = "restaurants"
    }
    else if(favType == "recipe"){
        name = fetchedObj.recipe.label
        category = "recipes"
    }
    userDataRef.child(category).child(name).set(fetchedObj)
    updateFavorites()
}

saveButtons.forEach(saveButton => {
    saveButton.style.display = 'block'
    saveButton.addEventListener('click',addFavorite)
})