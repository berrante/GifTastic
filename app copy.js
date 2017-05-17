var topics = ["pizza", "french fries", "donuts", "cheeseburger", "ice cream", "potato chips", "soda", "nachos"];


// dynamically make a button for each element in the array and give it a value of data-food
for (var i=0; i < topics.length; i++){
	$("#buttons").append("<button data-food='" + topics[i] + "'>");
	$("button").html(topics[i]);
}
	https://scc18.wifi.sputnik.com/pretamanger/pc/5/24
// when the user clicks on a button, do the following
 $("button").on("click", function() {
	 
	 //grab value data-food and assign it to a var called food
	  var food = $(this).attr("data-food");
	  
	   // Constructing the queryURL based on the value of a food. Also, sets a limit of 10 gifs.
      var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
        food + "&api_key=dc6zaTOxFJmzC&limit=10";

	// performing AJAX request
      $.ajax({
          url: queryURL,
          method: "GET"
        })
        // handling the AJAX response
        .done(function(response) {
	    
	      //pulling out the response's data and assinging it to a var 
          var results = response.data;

		  // loops through our results (up to 10)
          for (var i = 0; i < results.length; i++) {
	         
	        //set a var that creates a div called .item
            var gifDiv = $("<div class='item'>");

			//sets a var that pulls the "rating" element from the results array
            var rating = results[i].rating;

			// creating a p tag and fiving it the rating text
            var p = $("<p>").text("Rating: " + rating);

			// creatign nrw image and giving it propertires relevant to our current result
            var foodImage = $("<img>");
            foodImage.attr("src", results[i].images.fixed_height.url);

//			prepending the gif and rating
            gifDiv.prepend(p);
            gifDiv.prepend(foodImage);

			// prepends the gifDiv into the div already in the HTML
            $("#gifs-appear-here").prepend(gifDiv);
          }
        });
    });
