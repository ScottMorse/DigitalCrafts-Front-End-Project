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
    })
}

let logErrMsg
let logErr = false
const logErrEl = document.getElementById('log-err')
function loginUser(email,pswd){
    firebase.auth().signInWithEmailAndPassword(email,pswd).catch(function(error) {
        const errorCode = error.code;
        logErrMsg = error.message;
        logErrEl = logErrMsg
        logErr = true
    })
    .then(response => {
        if(!logErr){
            hidePopUp(document.getElementById('log-pop'))
            currentUserId = firebase.auth().currentUser.uid
            userDataRef = database.ref("users/" + currentUserId)
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

function configureObservers(){
    userDataRef.on('value', snapshot => {
        if(s != 0)
        {
            console.log('Value changed to user\'s stores.')
        }
        snapshot.forEach(childSnapShot => {
            
        })
        s++
    })
}

const logForm = document.getElementById('log-form')
const regForm = document.getElementById('reg-form')

logForm.addEventListener('submit',loginByForm)
regForm.addEventListener('submit',registerByForm)