let map
let marker

function initMap() {
    const userLoc = {lat: userLat, lng: userLon};
    map = new google.maps.Map(
        document.getElementById('map'), {zoom: 14, center: userLoc});
    marker = new google.maps.Marker({position: userLoc, map: map});
}

function updateMap(latitude,longitude){
    const pos = {lat: latitude, lng: longitude}
    map = new google.maps.Map(
    document.getElementById('map'), {zoom: 14, center: pos});
    marker = new google.maps.Marker({position: pos, map: map});
}