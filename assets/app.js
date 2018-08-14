//Initial array of animals
var animals = [
    "Lions",
    "Tigers",
    "Bears",
    "Dogs",
];

//API Stuff


var animalGif

//Function for displaying animal data 
function renderButtons() {

    $("#animalButtons").empty();

    //Loops through the animal array and creates buttons for each
    for (var i = 0; i < animals.length; i++) {
        var newButton = $("<button>");
        newButton.addClass("animal");
        newButton.attr("data-name", animals[i]);
        newButton.text(animals[i]);
        $("#animalButtons").append(newButton);
    }
};

//Function for making the "submit" button add an animal to the array

$("#addAnimal").on("click", function (event) {
    event.preventDefault();
    var animal = $("#animalInput").val().trim();
    animals.push(animal);
    renderButtons();
});

//Calls the initial list of animals
renderButtons();