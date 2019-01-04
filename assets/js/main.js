
var config = {
    apiKey: "AIzaSyC2pNVKb_umRvTZgssoUYSKhV0WxEvSsGk",
    authDomain: "do-or-dine-mf.firebaseapp.com",
    databaseURL: "https://do-or-dine-mf.firebaseio.com",
    projectId: "do-or-dine-mf",
    storageBucket: "do-or-dine-mf.appspot.com",
    messagingSenderId: "501696051430"
};

firebase.initializeApp(config);

var database = firebase.database();

var ratings = {
    "0": "assets/images/yelp-stars/small_0.png",
    "1": "assets/images/yelp-stars/small_1.png",
    "1.5": "assets/images/yelp-stars/small_1_half.png",
    "2": "assets/images/yelp-stars/small_2.png",
    "2.5": "assets/images/yelp-stars/small_2_half.png",
    "3": "assets/images/yelp-stars/small_3.png",
    "3.5": "assets/images/yelp-stars/small_3_half.png",
    "4": "assets/images/yelp-stars/small_4.png",
    "4.5": "assets/images/yelp-stars/small_4_half.png",
    "5": "assets/images/yelp-stars/small_5.png"
}

var zip;
//Hide the category page when the page loads
$("#main-container").hide();

//Show the category page when the submit is clicked

$("#sub-btn").on("click", function () {
    event.preventDefault();

    zip = $("#location-input").val().trim();
    console.log(zip);

    if (zip == "") {
        $("#location-field").fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
        $("#location-input").attr('placeholder', 'Please enter a valid location')
    }
    else {
        $("#enter-form").hide();
        $("#main-container").show();
        buildCatgegoryCards();
    }
});

//Building the cards for the categories when the page loads
function buildCatgegoryCards() {

    //empty the div before the search
    $("#category-div").show();
    $("#results").hide();

    database.ref("categories").on("value", function (snapshot) {
        console.log(snapshot.val());
        var categories = snapshot.val();
        var keys = Object.keys(categories);

        for (i = 0; i < keys.length; i++ ) {
            
            currentCat = keys[i];

            categoryName = categories[currentCat].catName;
            console.log(categoryName);

            categoryImgUrl = categories[currentCat].catImageUrl;
            console.log(categoryImgUrl);

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

        }
    });
}

$(document).on("click", ".image-card", function () {

    //hide category buttons and show the results div
    $("#category-div").hide();
    $("#results-div").show();
    $("#reset").show()   

    //attribute from the card for the food name
    var q = $(this).attr("data-food-name");
    // console.log(q);

    var resetDiv = $("<div class='col-12' id='reset-div'>")
    resetDiv.html(
        "<div class='btn btn-danger' id='reset-button'> <i class='fas fa-redo'></i>  Select another Category </div>"
        )

    $("#results-div").prepend(resetDiv)

    //query URL for recipes
    var queryURL1 = "https://www.food2fork.com/api/search?key=1133c55853af81a0322420080892b7fe&q=" + q + "&sort=r&page=1";
    // console.log(queryURL1)

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
            console.log(response)
            createCardRestaurant(response);
        });

    function createCardRecipes(dataRecipe) {

        var recipeColumn = $("<div class='col-md-6' id='recipes-div'>")
        $("#results-div").append(recipeColumn);
        
        //add column title to the div
        var colHeader = $("<div class='column-header'>");
        colHeader.text("Recipes")

        var response = JSON.parse(dataRecipe);
        for (var i = 0; i < 5; i++) {

            //creating and storing a div for the recipe bootstrap card
            var recipeCard = $("<div class='card recipe'>");
            var recipeRow = $("<div class='row'>")
            var recipeImg = $("<div class='horizontal-image col-4 px-0'>")
            var recipeInfo = $("<div class='col-8 info-section'>")

            //saving responses to variables
            var image = $("<img>");
            image.attr("src", response.recipes[i].image_url);

            //recipe stars
            var reciperating = response.recipes[i].social_rank;
            var ratingStars = $("<img class='rating-stars'>")
            
            if (reciperating >= 80){
                ratingStars.attr("src", "assets/images/recipe-stars/5-stars.png")
            } else if (80 > reciperating >= 60){
                ratingStars.attr("src", "assets/images/recipe-stars/4-stars.png")
            } else if (60 > reciperating >= 40) {
                ratingStars.attr("src", "assets/images/recipe-stars/3-stars.png")
            } else if (40 > reciperating >= 20) {
                ratingStars.attr("src", "assets/images/recipe-stars/2-stars.png")
            } else if (20 > reciperating) {
                ratingStars.attr("src", "assets/images/recipe-stars/1-star.png")
            }    

            var title = $("<h5 class='card-title'>").html(response.recipes[i].title);
            var recipeSource = response.recipes[i].source_url;
            var recipeLink = $("<a class='btn green link-btn' target='_blank'>");

            recipeLink.text("View Recipe");
            recipeLink.attr("href", recipeSource)

            recipeImg.append(image)
            recipeInfo.append(title, ratingStars, recipeLink);
            recipeRow.append(recipeImg, recipeInfo);
            recipeCard.append(recipeRow);
            recipeColumn.prepend(recipeCard);
        }

        //Prepend the column header to it all
        recipeColumn.prepend(colHeader);

    };

    function createCardRestaurant(dataRestaurant) {

        var restaurantColumn = $("<div class='col-md-6 ' id='restaurant-div'>")
        $("#results-div").append(restaurantColumn);


        //add column title to the div
        var colHeader = $("<div class='column-header'>");
        colHeader.text("Restaurants")
        

        var response = dataRestaurant;
        for (var i = 0; i < 5; i++) {

            //creating and storing a div for the recipe bootstrap card
            var restaurantCard = $("<div class='card restaurant'>");
            var restaurantRow = $("<div class='row'>")
            var restaurantImg = $("<div class='horizontal-image col-4 px-0'>")
            var restaurantInfo = $("<div class='col-8 info-section'>")

            //saving responses to variables
            var image = $("<img>");
            image.attr("src", response.businesses[i].image_url);

            var title = $("<h5 class='card-title'>").text(response.businesses[i].name);
            var address = $("<p class='card-text address'>").html(response.businesses[i].location.address1 + "<br>" + response.businesses[i].location.city + "," + response.businesses[i].location.country);
            var price = $("<div class='card-img-overlay'>").html("<h5 class='price'>" + response.businesses[i].price + "</h5>");
            var restaurantUrl = response.businesses[i].url;
            var restaurantLink = $("<a class='row btn green link-btn' target='_blank'>");

            restaurantLink.text("More Info");
            restaurantLink.attr("href", restaurantUrl);

            var rating = response.businesses[i].rating;
            var ratingsImg = $("<img class='rating-stars'>");

            ratingsImg.attr("src", ratings[rating]);

            restaurantCard.append(restaurantRow);

            restaurantImg.append(image, price);
            restaurantRow.prepend(restaurantImg);
            restaurantInfo.append(title, ratingsImg,  address, restaurantLink);
            restaurantRow.append(restaurantInfo);
            restaurantColumn.prepend(restaurantCard);
        }

        //Prepend the column header to it all
        restaurantColumn.prepend(colHeader);
    };
});

$(document).on("click", "#reset-button", function() {
    $("#category-div").show();
    $("#results-div").hide();
    $("#results-div").empty();
    $('#reset-button').hide();
    q = "";
});
 

