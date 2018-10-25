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
function loginUser(email,pswd){
    firebase.auth().signInWithEmailAndPassword(email,pswd).catch(function(error) {
        const errorCode = error.code;
        logErrMsg = error.message;
        logErrEl.innerHTML = logErrMsg
        logErr = true
    })
    .then(response => {
        if(!logErr){
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
function updateFavorites(){
    //!Clear menu innerHTMLs
    if(userFavorites){
        const favMovies = userFavorites.movies || {}
        const favRests = userFavorites.restaurants || {}
        const favRecipes = userFavorites.recipes || {}
        Object.keys(favMovies).forEach(movieFavKey => {
            const movieFav = favMovies[movieFavKey]
            // add to HMTL
        })
        Object.keys(favRests).forEach(restFavKey => {
            const restFav = favRests[restFavKey]
            //do stuff
        })
        Object.keys(favRecipes).forEach(recipeFavKey => {
            const recipeFav = favMovies[recipeFavKey]
            //do stuff
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