
          
         var myurl = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?categories=movietheaters&latitude=-41.23333300&longitude=173.31666700&radius=25000" // Add template literals for coordinates
         
         let restaurantResults = []

         $.ajax({
            url: myurl,
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
                    // Display a header on the page with the number of results
                    $('#results').append('<h5>We discovered ' + totalresults + ' results!</h5>');
                    // Itirate through the JSON array of 'businesses' which was returned by the API
                    $.each(data.businesses, function(i, item) {
                        // Store each business's object in a variable
                       restaurantResults.push(item)
                        // Append our result into our page
                        $('#results').append('<div id="' + id + '" style="margin-top:50px;margin-bottom:50px;"><img src="' + image + '" style="width:200px;height:150px;"><br>We found <b>' + name + '</b> (' + alias + ')<br>Business ID: ' + id + '<br> Located at: ' + address + ' ' + city + ', ' + state + ' ' + zipcode + '<br>Phone Number: ' + phone + '<br>This business has a rating of ' + rating + ' with ' + reviewcount + ' reviews.</div>') ;
                  });
                } else {
                    // If our results are 0; no businesses were returned by the JSON therefor we display on the page no results were found
                    $('#results').append('<h5>We discovered no results!</h5>');
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
        //  var latitude = item.coordinates.latitude;