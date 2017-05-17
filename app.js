// given topics
var topics = ["pizza", "french fries", "donuts", "cheeseburger", "ice cream", "potato chips", "soda", "nachos"];

// dynamically make a button for each element in the array and give it a value of data-food	
for (var i=0; i < topics.length; i++){
	$("#buttons").append("<button data-food='" + topics[i] + "'>" + topics[i] + "</button>");
}

/* call function */
getGifs();

// when the user clicks on the add button, do the following
$("#add-food").on("click", function(event) {
      // prevent form from submitting
      event.preventDefault();

      // Get the food "value" from the textbox and store it a variable
	  var foodItem = $("#food-input").val().trim();
	  
	 //give the foodItem a button and add it to the buttons div
	  $("#buttons").append("<button data-food='" + foodItem + "'>" + foodItem + "</button>");

	  //clear search box when done
	  $("#food-input").val("");
	  
	  // run function
	  getGifs();
})


// create a function that runs a whole buncha stuff when a food button is clicked		
function getGifs() {
	
		 //when user clicks on food button,
		 $("button").on("click", function () {
			 
			  //grab value data-food and assign it to a var called food
			  var food = $(this).attr("data-food");
			  
			  // Constructing the queryURL based on the value of a food. Also, sets a limit of 10 gifs.
		      var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
		        food + "&api_key=dc6zaTOxFJmzC&limit=12";
		        
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
		            
/*
					//sets a var that pulls the "rating" element from the results array
		            var rating = results[i].rating;
		            
					// creating a p tag and fiving it the rating text
		            var p = $("<p>").text("Rating: " + rating);
		            
*/
					// creating new image and giving it attributes for source, state, animmate, and still
		            var foodImage = $("<img>");
		            foodImage.attr({"src": results[i].images.fixed_height.url,
			            			"data-state": "still",
									"data-animate": results[i].images.fixed_height.url,
			            			"data-still": results[i].images.fixed_height_still.url
			            			});
			            			
			        //add a class of .gif to img
		            foodImage.addClass("gif");
		            
					//prepending the gif and rating
// 		            gifDiv.prepend(p);
		            gifDiv.prepend(foodImage);
		            
					// prepends the gifDiv into the div already in the HTML
		            $("#gifs-appear-here").prepend(gifDiv);
		            
		            // when gif is clicked,
					$(".gif").on("click", function() {
					
					// 'this' specificies what is clikced, instead of just every gif on the page
					var state = $(this).attr("data-state");
			  
				   // logic
			       if (state === "still") {
				       
				       $(this).attr("src", $(this).attr("data-animate"));
				       $(this).attr("data-state", "animate");
			       }
			       else {
				       $(this).attr("src", $(this).attr("data-still"));
				       $(this).attr("data-state", "still");
			       }
				})
					
	         } //AJAX response
	          
	    }); //AJAX request
	           
	}); //button click function
	
} //getGifs

