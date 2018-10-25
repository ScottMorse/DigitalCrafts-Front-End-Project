
          
        const yelpUrl = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?categories=restaurants&latitude=1234567&longitude=7654321&radius=2000".replace("1234567",userLat || 0).replace("7654321",userLon || 0) // Add template literals for coordinates

        const restaurants = Array.from(document.querySelectorAll('.restaurant'))

        let restaurantResults = []

         $.ajax({
            url: yelpUrl,
            headers: {
             'Authorization':'Bearer q9gG6uLGZ8nHX-cHkSNWYFDhYp-v9fEX2hcFfGz7LeYgiX9xNrsAlhI4J87MCNBKJLjUhia4mS0F5BtYmxA18bvRg5IOJgK7g4Gn08787QpEJ8rB7ypa6X1B1xnOW3Yx',
         },
            method: 'GET',
            dataType: 'json',
            success: function(data){
                // Grab the results from the API JSON return
                var totalresults = data.total;
                // If our results are greater than 0, continue
                if (totalresults > 0){
                    // Itirate through the JSON array of 'businesses' which was returned by the API
                    $.each(data.businesses, function(i, item) {
                        // Store each business's object in a variable
                       restaurantResults.push(item)
                  });
                  let resti = 1
                  restaurantResults.slice(0,5).forEach(restaurant => {
                     restaurant.masterKey = resti - 1
                     masterObject.restaurant.push(restaurant)
                     const restEl = document.getElementById("restaurant" + resti)
                     restEl.children[1].innerHTML = restaurant.name
                     restEl.children[2].style.backgroundImage = 'url(' + restaurant.image_url + ')'
                     for(let xx = 0;xx < Math.round(restaurant.rating);xx++){
                        restEl.children[3].innerHTML += "✪"
                     }
                     const restPos = {lat:restaurant.coordinates.latitude,lng:restaurant.coordinates.longitude}
                     const restMapObj = allMaps["restaurant-map" + resti]
                     restMapObj.map.setCenter(restPos)
                     const marker = new google.maps.Marker({position: restPos, map: restMapObj.map});
                     const mapsUrl = `http://maps.google.com/maps/search/?api=1&z=15&query=${restPos.lat},${restPos.lng}&ll=${restPos.lat}+${restPos.lng}`
                     marker.addListener('click',()=>openTab(mapsUrl))
                     resti++
                  })
                  console.log(restaurantResults)
                  console.log(masterObject)
                } else {
                    // If our results are 0; no businesses were returned by the JSON therefor we display on the page no results were found
                    console.log("No restaurant results.")
                }
            }
         });      

    


        //  var id = item.id;
        //  var alias = item.alias;
        //  var phone = item.display_phone;
        //  var image = item.image_url;
        //  var name = item.name;
        //  var rating = item.rating;
        //  var reviewcount = item.review_count;
        //  var address = item.location.address1;
        //  var city = item.location.city;
        //  var state = item.location.state;
        //  var zipcode = item.location.zip_code;
        //  var longitude = item.coordinates.longitude
        //  var latitude = item.coordinates.latitudee;