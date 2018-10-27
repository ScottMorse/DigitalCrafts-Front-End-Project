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
    yelpScript.src = 'scripts/yelp.js'
    document.body.appendChild(yelpScript)
}

function openTab(url){
    let win = window.open(url,'_blank')
    win.focus()
}

const mapButtons = Array.from(document.querySelectorAll('.map-button'))

function toggleMap(){
    const contImg = this.previousElementSibling
    const contMap = this.parentElement.lastElementChild
    if(contImg.classList.contains('transparent')){
        contMap.classList.toggle('up')
        contMap.style.opacity = 0
        setTimeout(()=>contImg.classList.toggle('transparent'),100)
    }
    else {
        contImg.classList.toggle('transparent')
        setTimeout(()=>{contMap.classList.toggle('up');contMap.style.opacity = 1},500)
    }
}

mapButtons.forEach(mapButton => {
    mapButton.addEventListener('click',toggleMap)
})