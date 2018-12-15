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


//card attr data-foodName

//Building the cards for the categories when the page loads
function buildCatgegoryCards(){

    //empty the div before the search
    $("#category-div").empty();

    for(i=0; i < categories.length; i++) {
        
        currentCat = categories[i];
        console.log(currentCat.catName)

        categoryName = currentCat.catName;
        categoryImgUrl = currentCat.catImageUrl;

        //create a new category card div
        var newCategory = $("<div>");
        newCategory.attr("id", "");
        newCategory.addClass("card image-card");
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
buildCatgegoryCards();


$(document).on("click", ".image-card", function () {
    //attribute from the card for the food name
    var q = $(this).attr("data-food-name");
    console.log(q);
    //query URL
    var queryURL = "https://www.food2fork.com/api/search?key=fb4f39eb5ea6ffbeb0f3f3811432fc39&q=" + q + "&sort=r&page=1";
    console.log(queryURL)
    //ajax Query
    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function (response) {
            // debugger
            var results = JSON.parse(response);
            
            
        });
});
