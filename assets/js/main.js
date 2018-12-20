var zip;

var categories = [

    {
        catName: "american",
        catImageUrl: "assets/images/burger-chips-dinner-70497.jpg"

    }, 
    {
        catName: "indian",
        catImageUrl: "assets/images/bowl-chicken-close-up-674574.jpg"

    },
    {
        catName: "japanese",
        catImageUrl: "assets/images/asia-carrot-chopsticks-357756.jpg"

    },
    {
        catName: "chinese",
        catImageUrl: "assets/images/asian-blur-cabbage-1028734.jpg"

    },
    {
        catName: "mexican",
        catImageUrl: "assets/images/burrito-chicken-close-up-461198.jpg"

    },
    {
        catName: "vegan",
        catImageUrl: "assets/images/avocado-basil-close-up-1143754.jpg"

    },
]

//Hide the category page when the page loads
$("#main-container").hide();


//Show the category page when the submit is clicked

$("#sub-btn").on("click", function() {
    event.preventDefault();

    zip = $("#location-input").val().trim();
    console.log(zip);

    $("#enter-form").hide(); 
    $("#main-container").show();
    buildCatgegoryCards();  
});


//Building the cards for the categories when the page loads
function buildCatgegoryCards(){

    //empty the div before the search
    $("#category-div").show();
    $("#results").hide();

    for(i=0; i < categories.length; i++) {
        
        currentCat = categories[i];
        console.log(currentCat.catName)

        categoryName = currentCat.catName;
        categoryImgUrl = currentCat.catImageUrl;

        //create a new category card div
        var newCategory = $("<div>");
        newCategory.attr("id", "");
        newCategory.addClass("card image-card categories");
        newCategory.attr("data-food-name", categoryName);

        var newCategoryImage = $("<img>");
        newCategoryImage.addClass("card-img-top");
        newCategoryImage.attr("src", categoryImgUrl);
        
        var newCategoryName = $("<h5>");
        newCategoryName.addClass("card-title");
        newCategoryName.text(categoryName);
        console.log(categoryName)

        newCategory.append(newCategoryImage);
        newCategory.append(newCategoryName);

        $("#category-div").append(newCategory)
        console.log(currentCat)
    };
}

// buildCatgegoryCards();


$(document).on("click", ".image-card", function () {

    //hide category buttons and show the results div
    $("#category-div").hide();
    $("#results-div").show();

    //attribute from the card for the food name
    var q = $(this).attr("data-food-name");
    console.log(q);

    //query URL for recipes
    var queryURL1 = "https://www.food2fork.com/api/search?key=fb4f39eb5ea6ffbeb0f3f3811432fc39&q=" + q + "&sort=r&page=1";
    console.log(queryURL1)
    
    //ajax query for recipes
    $.ajax({
        url: queryURL1,
        method: "GET"
    })
        .then(function (response) {
            createCardRecipes(response);
        });

    //query URL for restaurants
    var queryURL2 = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?categories=" + q + "&location=" + zip;
    var key = "5FlEmy8iWdFAZEZf38vDDqBMWKiQ3ThCjti3C9vVhnsDjDQdKdJxps2Pll7_0Z3qT-IM-9CnKRVl3Vhe9jHUPUh8JutiEzogjAF5Wx5106kd91kx65cHShvJEikVXHYx"
    //ajax query for restaurants
    console.log(queryURL2);
    $.ajax({
        url: queryURL2,
        method: "GET",
        headers: {
            "Authorization": "Bearer " + key,
        }
        })
        .then(function (response) {
            createCardRestaurant(response);
    });

    function createCardRecipes(dataRecipe) {

        var recipeColumn = $("<div class='col-md-6' id='recipes-div'>")
        $("#results-div").append(recipeColumn);

        var response = JSON.parse(dataRecipe);
        for (var i = 0; i < 5; i++) {
            //creating and storing a div for the recipe bootstrap card
            var recipeCard = $("<div>");

            //setting the class per result for card
            recipeCard.attr("class", "card recipe");

            //saving responses to variables
            var image = $("<img class='recipe-image col-4 p-0'>");
            image.attr("src", response.recipes[i].image_url);
            var title = $("<h5 class='card-title'>").text(response.recipes[i].title);
            var socialRank = $("<h6 class='card-subtitle'>").text(response.recipes[i].social_rank);
            var recipeSource = $("<p class='card-text'>").text(response.recipes[i].source_url);

            recipeCard.prepend(image);
            recipeCard.append(title);
            recipeCard.append(socialRank);
            recipeCard.append(recipeSource);

            recipeColumn.prepend(recipeCard);
        }
        
    };

    function createCardRestaurant(dataRestaurant) {

        var restaurantColumn = $("<div class='col-md-6' id='restaurant-div'>")
        $("#results-div").append(restaurantColumn);

        var response = dataRestaurant;
        for (var i = 0; i < 5; i++) {
            //creating and storing a div for the recipe bootstrap card
            var restaurantCard = $("<div>");

            //setting the class per result for card
            restaurantCard.attr("class", "card restaurant");

            //saving responses to variables
            var image = $("<img class='card-img-top'>");
            console.log(response.businesses[i]);
            image.attr("src", response.businesses[i].image_url);
            var title = $("<h5 class='card-title'>").text("Title: " + response.businesses[i].name);
            var rating = $("<h6 class='card-subtitle'>").text("Rating: " + response.businesses[i].rating);
            var location = $("<p class='card-text'>").text("Location:" + response.businesses[i].location.address1);
            var price= $("<p class='card-text'>").text(response.businesses[i].price);

            restaurantCard.prepend(image);
            restaurantCard.append(title);
            restaurantCard.append(rating);
            restaurantCard.append(location);
            restaurantCard.append(price);

            restaurantColumn.prepend(restaurantCard);
        }
    };
});

 