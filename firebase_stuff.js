const database = firebase.database()

let currentUserId
let userDataRef

let regErrMsg
let regErr = false
function registerUser(email,pswd){
    firebase.auth().createUserWithEmailAndPassword(email, pswd).catch(function(error) {
        const errorCode = error.code;
        regErrMsg = error.message;
        regErr = true
    })
    .then(response => {
        if(!regErr)
        {
            loginUser(email,pswd)
        }
    })
}

let logErrMsg
let logErr = false
function loginUser(email,pswd){
    firebase.auth().signInWithEmailAndPassword(email,pswd).catch(function(error) {
        const errorCode = error.code;
        logErrMsg = error.message;
        logErr = true
    })
    .then(response => {
        if(!loginErr){
            currentUserId = firebase.auth().currentUser.uid
            userDataRef = database.ref("users/" + currentUserId)
            setTimeout(()=>{
                storeForm.style.opacity = 1
                storeLists.style.opacity = 1
            },100)
            configureObservers()
            return
        }
        loginErr = false
    })
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