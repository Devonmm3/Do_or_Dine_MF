var categories = [

    {
        catName: "american",
        catImageUrl: "assets/images/burger-chips-dinner-70497.jpg"

    }, 
    {
        catName: "indian",
        catImageUrl: "/assets/images/bowl-chicken-close-up-674574.jpg"

    },
    {
        catName: "japanese",
        catImageUrl: "/assets/images/asia-carrot-chopsticks-357756.jpg"

    },
    {
        catName: "chinese",
        catImageUrl: "../assets/images/asian-blur-cabbage-1028734.jpg"

    },
    {
        catName: "mexico",
        catImageUrl: "/assets/images/burrito-chicken-close-up-461198.jpg"

    },
    {
        catName: "vegan",
        catImageUrl: "/assets/images/avocado-basil-close-up-1143754.jpg"

    },
]


//card attr data-foodName

//Building the cards for the categories when the page loads
function buildCatgegoryCards(){

    //empty the div before the search
    $("#category-div").empty();

    for(i=0; i <= categories.length; i++) {
        currentCat = categories[i];
        console.log(currentCat)
        // categoryName = currentCat.catName;
        categoryImgUrl = currentCat.catImageUrl;

        //create a new category card div
        var newCategory = $("<div>");
        newCategory.addClass("card");
        newCategory.attr("data-foodName", categoryName);

        var newCategoryImage = $("<img>");
        newCategoryImage.attr("src", categoryImgUrl);
        
        var newCategoryName = $("h3");
        newCategoryName.text(categoryName);

        newCategory.append(newCategoryImage);
        newCategory.append(newCategoryName);
    };


}
buildCatgegoryCards();


$(document).on("click", ".image-card", function () {
    //query URL
    var url = "https://www.food2fork.com/api/get?key=fb4f39eb5ea6ffbeb0f3f3811432fc39" + q + "&sort=r&page=1";
    //attribute from the card for the food name
    var q = $(this).attr("data-food-name");
    console.log(q);
    //ajax Query
    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function (response) {
            console.log(response)
        });
});
