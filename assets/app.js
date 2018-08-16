//Initial array of desserts
var desserts = [
    "Cookies",
    "Pies",
    "Doughnuts",
    "Cakes",
];

//API Stuff
function displayDessertsGifs() {
    $("#desserts").empty();
    var dessert = $(this).attr("data-name");
    var limit = 10;
    console.log("Hello!")
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + dessert + "&limit=" + limit + "&api_key=gLeB5PHXzjgIpt57b5y35Y0ukNAkv14k";
    console.log(queryURL);

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        //get the rating of each dessert gif
        for (i = 0; i < limit; i++) {
            //get the rating of the gif
            var rating = response.data[i].rating;
            console.log(rating);
            var dessertDiv = $("<div class='dessert'>");
            var pRatingOne = $("<p>").text("Rating: " + rating);
            dessertDiv.append(pRatingOne);
            $("#desserts").prepend(dessertDiv);

            //get the still and animated images of the gif

            var originalStill = response.data[i].images.original_still.url;
            var animatedGif = response.data[i].images.original.url;
            console.log("originalStill is: " + originalStill);
            var pStillImage = $("<img>").attr({ src: originalStill, id: 'images' + i, "data-state": "still", "data-still": originalStill, "data-animate": animatedGif, class: "images" });
            dessertDiv.append(pStillImage);
            console.log("animatedGif is: " + animatedGif);
            //Clicking on the still gif animates it and vice versa
            $("#images" + i).on("click", function () {
                var state = $(this).attr("data-state");
                console.log("This is the State: " + state);
                console.log(this);
                if (state === "still") {
                    $(this).attr("src", $(this).attr("data-animate"));
                    $(this).attr("data-state", "animate");
                } else {
                    $(this).attr("src", $(this).attr("data-still"));
                    $(this).attr("data-state", "still");
                };
            });

        };
    });

};

//Function for displaying dessert button
function renderButtons() {

    $("#dessertButtons").empty();

    //Loops through the desserts array and creates buttons for each
    for (var i = 0; i < desserts.length; i++) {
        var newButton = $("<button>");
        newButton.addClass("dessertButton");
        newButton.attr("data-name", desserts[i]);
        newButton.text(desserts[i]);
        $("#dessertButtons").append(newButton);
    }
};

//Function for making the "submit" button add an dessert to the array

$("#addDessert").on("click", function (event) {
    event.preventDefault();
    var dessert = $("#dessertInput").val().trim();
    desserts.push(dessert);
    renderButtons();
});

//Click event listener for all added dessert buttons
$(document).on("click", ".dessertButton", displayDessertsGifs);

//Calls the initial list of desserts
renderButtons();

