let map
let marker

const allMapEls = Array.from(document.querySelectorAll('.cont-map'))

let allMaps = {
    "restaurant-map1": {hello:"hello"},
    "restaurant-map2": {},
    "restaurant-map3": {},
    "restaurant-map4": {},
    "restaurant-map5": {},
    "movie-map1": {},
    "movie-map2": {},
    "movie-map3": {},
    "movie-map4": {},
    "movie-map5": {},
}

function initMap() {
    const userLoc = {lat: userLat, lng: userLon};
    Object.keys(allMaps).forEach(mapKey => {
        let map = new google.maps.Map(
            document.getElementById(mapKey), {zoom: 18, center: userLoc});
        allMaps[mapKey] = {map: map, marker: marker}
    })
    getLocalTheaters()
    const yelpScript = document.createElement('script')
    yelpScript.src = 'yelp.js'
    document.body.appendChild(yelpScript)
}

function openTab(url){
    let win = window.open(url,'_blank')
    win.focus()
}