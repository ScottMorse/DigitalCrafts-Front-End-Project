

function addFavorite(){
    this.innerHTML = "Saved to Favorites!"
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
       Object.keys(fetchedObj.recipe.totalNutrients).forEach(key => {
            if(key.includes(".")){
                keyVal = fetchedObj.recipe.totalNutrients[key]
                delete fetchedObj.recipe.totalNutrients[key]
                newKey = key.replace("."," ")
                fetchedObj.recipe.totalNutrients[newKey] = keyVal
            }
        })
        category = "recipes"
    }
    userDataRef.child(category).child(name).set(fetchedObj)
}

const saveButtons = Array.from(document.querySelectorAll('.save'))
saveButtons.forEach(saveButton => {
    if(saveButton.id != "recipe-save-0")
    {
       saveButton.style.display = 'block'
    }
    saveButton.addEventListener('click',addFavorite)
})
