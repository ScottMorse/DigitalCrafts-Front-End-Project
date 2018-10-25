const database = firebase.database()

let currentUserId
let userDataRef

let regErrMsg
let regErr = false
const regErrEl = document.getElementById('reg-err')
function registerUser(email,pswd){
    firebase.auth().createUserWithEmailAndPassword(email, pswd).catch(function(error) {
        const errorCode = error.code;
        regErrMsg = error.message;
        regErrEl.innerHTML = regErrMsg
        regErr = true
    })
    .then(response => {
        if(!regErr)
        {
            loginUser(email,pswd)
            hidePopUp(document.getElementById('reg-pop'))
        }
        regErr = false
    })
}

let logErrMsg
let logErr = false
const logErrEl = document.getElementById('log-err')
const favMenu = document.getElementById('favorites-menu-wrap')
function loginUser(email,pswd){
    firebase.auth().signInWithEmailAndPassword(email,pswd).catch(function(error) {
        const errorCode = error.code;
        logErrMsg = error.message;
        logErrEl.innerHTML = logErrMsg
        logErr = true
    })
    .then(response => {
        if(!logErr){
            favMenu.style.display = 'unset'
            setTimeout(()=>favMenu.style.opacity = 1,100)
            const newScript = document.createElement('script')
            newScript.src = 'favorites.js'
            document.body.appendChild(newScript)
            hidePopUp(document.getElementById('log-pop'))
            currentUserId = firebase.auth().currentUser.uid
            userDataRef = database.ref("users/" + currentUserId)
            const oldButton = document.getElementById("reg-button");
            const newButton = oldButton.cloneNode(true);
            oldButton.parentNode.replaceChild(newButton, oldButton);
            newButton.innerHTML = "Welcome, " + email + "!"
            newButton.removeEventListener('click',()=>showPopUp(regPopUp))
            logButton.style.display = "none"
            configureObservers()
            return
        }
        logErr = false
    })
}


function loginByForm(e){
    e.preventDefault()
    loginUser(this.children[0].value,this.children[1].value)
}

function registerByForm(e){
    e.preventDefault()
    registerUser(this.children[0].value,this.children[1].value)
}

let userFavorites
const wordRegex = new RegExp(/\b[A-Za-z0-9]+\b/,'g')
const restMenu = document.getElementById('restaurant-menu')
const recipeMenu = document.getElementById('recipe-menu')
const movieMenu = document.getElementById('movie-menu')
function updateFavorites(){
    console.log(userFavorites)
    restMenu.innerHTML = recipeMenu.innerHTML = movieMenu.innerHTML = ""
    if(userFavorites){
        const favMovies = userFavorites.movies || {}
        const favRests = userFavorites.restaurants || {}
        const favRecipes = userFavorites.recipes || {}
        if(favMovies != "")
        Object.keys(favMovies).forEach(movieFavKey => {
            const movieFav = favMovies[movieFavKey]
            const newLi = document.createElement('li')
            const newA = document.createElement('a')
            newA.target = "_blank"
            newA.tabIndex = '0'
            newLi.appendChild(newA)
            newA.innerHTML = movieFav.title
            newA.href = movieFav.officialUrl
            movieMenu.appendChild(newLi)
        })
        Object.keys(favRests).forEach(restFavKey => {
            const restFav = favRests[restFavKey]
            const newLi = document.createElement('li')
            const newA = document.createElement('a')
            newA.target = "_blank"
            newA.tabIndex = '0'
            newLi.appendChild(newA)
            newA.innerHTML = restFav.name
            newA.href = "http://maps.google.com/maps/search/?api=1&z=15&query=" + restFav.name.match(wordRegex).join('+')
            restMenu.appendChild(newLi)
        })
        Object.keys(favRecipes).forEach(recipeFavKey => {
            const recipeFav = favRecipes[recipeFavKey]
            const newLi = document.createElement('li')
            const newA = document.createElement('a')
            newA.target = "_blank"
            newA.tabIndex = '0'
            newLi.appendChild(newA)
            newA.innerHTML = recipeFav.recipe.label
            newA.href = recipeFav.recipe.url
            recipeMenu.appendChild(newLi)
        })
    }
}

let s = 0
function configureObservers(){
    userDataRef.on('value', snapshot => {
        if(s != 0)
        {
            console.log('Value changed to user\'s stores.')
        }
        userFavorites = snapshot.val()
        updateFavorites()
        s++
    })
}

const logForm = document.getElementById('log-form')
const regForm = document.getElementById('reg-form')

logForm.addEventListener('submit',loginByForm)
regForm.addEventListener('submit',registerByForm)