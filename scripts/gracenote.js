function getDateYYYYMMDD(){
    const today = new Date();
    const dd = today.getDate();

    const mm = today.getMonth()+1; 
    const yyyy = today.getFullYear();
    if(dd<10) 
    {
        dd='0'+dd;
    } 
    if(mm<10) 
    {
        mm='0'+mm;
    }
    return yyyy + '-' + mm + '-' + dd
}

const movieEls = Array.from(document.querySelectorAll('.movie'))

let showings
function getLocalTheaters(){
    fetch("https://cors-anywhere.herokuapp.com/data.tmsapi.com/v1.1/movies/showings?startDate=" + getDateYYYYMMDD() + "&api_key=syh7qykyctv94cu3rybjna7b&lat=" + Math.round(userLat) + "&lng=" + Math.round(userLon) + "&radius=20",)
    .then(response => {
        return response.json()
    })
    .then(showingJson => {
        showings = showingJson
        console.log(showings)
        let mi = 0
        const today = new Date()
        movieEls.forEach(movieEl => {
            const showing = showings[mi]
            showing.masterKey = mi
            masterObject.movie.push(showing)
            showing.showtimes.forEach(showtime => {
                const showtimeDate = Date.parse(showtime.dateTime)
                if(showtimeDate - today.getTime() >= 36000 && !showing.goodShowtime){
                    showing.goodShowtime = showtime
                }
            }) 
            //! fetch("http://data.tmsapi.com/v1.1/theatres/" + goodShowtime.theatre.id + "&api_key=syh7qykyctv94cu3rybjna7b")
            //     .then(response => {
            //         response.json()
            //     })
            //     .then(theaterJson =>{
            //         const movieMapObj = allMaps["movie-map" + mi]
            //         const theaterPos = {lat:theaterJson.location.geoCode.latitude,lng:theaterJson.location.geoCode.longitude}
            //         movieMapObj.map.center = theaterPos
            //         movieMapObj.marker.position = theaterPos
            //     })
            movieEl.children[1].innerHTML = showing.title
            setTimeout(()=>{
                movieEl.children[2].style.backgroundImage = 'url(' + 'http://developer.tmsimg.com/123456?&api_key=syh7qykyctv94cu3rybjna7b'.replace("123456",showing.preferredImage.uri) + ')'
                movieEl.children[2].style.backgroundColor = 'whitesmoke'
                movieEl.children[2].style.border = '6px solid whitesmoke'
            },mi * 600)
            const movieMapObj = allMaps["movie-map" + (mi + 1)]
            movieMapObj.map.setCenter({lat:userLat,lng:userLon})
            const theatUrl = `http://maps.google.com/maps/search/?api=1&z=15&query=${showing.goodShowtime.theatre.name.match(wordRegex).join('+')}&ll=${userLat}+${userLon}`
            movieMapObj.map.addListener('click',()=>openTab(theatUrl))
            if(showing.goodShowtime.hasOwnProperty('ticketURI')){
                movieEl.children[4].href = showing.goodShowtime.ticketURI
            }
            else{
                movieEl.children[4].innerHTML = ""
            }
            movieEl.children[5].innerHTML = "Theater: " + showing.goodShowtime.theatre.name
            mi++
        })
        console.log(masterObject)
    })
}

/*
Movie array:
Each item is an object.
Properties:
title
tmsId
topCast (3) [] (actors)
advisories
genres []
holiday
shortDescription
longDescription
releaseDate
runTime (ISO format)
preferredImage{
    width
    height
    uri: 'assets/p15456641_v_v5_ab.jpg' (wherever this is...)
}
showtimes [] each:
    title
    dateTime (ISO format)
    theater {
        id
        name
    }
    ticketURI (for fandango etc)
*/