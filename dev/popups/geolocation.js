let userLat
let userLon

const geoOptions = {
    enableHighAccuracy: true, 
    maximumAge        : 600000, 
    timeout           : 10000,
}

let watchID
if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(geoSuccess,geoError,geoOptions)
}
else {
    console.error('Geolocation is not available on this browser.')
}

let firstLoad = true
function geoSuccess(position){
    userLat = position.coords.latitude
    userLon =  position.coords.longitude
    if(firstLoad){
        console.log("Geolocation success.")
        console.log(userLat,userLon)
        const script = document.createElement('script')
        script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBXLCcENFupNH9DkxvC7z43zqkjdp4QcLc&callback=initMap'
        document.head.appendChild(script)
    }
    // getLocalTheaters()
    firstLoad = false
}

function geoError(){
    console.error("Geolocation error.")
    if(userLat && userLon){
        console.warn("Despite geolocation error, location data still available.")
    }
}