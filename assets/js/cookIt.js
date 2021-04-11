
$("#saveButton").on("click", function () {
  alert("it clicked");
});
$("#saveButton").on("click", function () {
  alert("it clicked");
});
ingredientsArr = [];

//get value from ingredientName
$('#ingredientInput').submit(function(event){
  // set value of the ingredient input to a variable
  var ingredient = $('#ingredientName').val();
  // append that ingredient to the list on the page
  $('#ingredientList').append('<li>' + ingredient + '</li>');
  // push the ingredient to an array
  ingredientsArr.push(ingredient);
  // clear the ingredient input after a submit
  $('#ingredientName').val('');
  spoonFetch();
  event.preventDefault();
});

fetch("https://edamam-recipe-search.p.rapidapi.com/search?q=chicken&320262843fmsh4a1ae8efe85b19ap1f26d7jsn8212be03ceae")
  .then(function(response){
    return response.json();
  })
  .then(function(data) {
      console.log(data);
  })

var spoonFetch = function(){ fetch("https://api.spoonacular.com/recipes/findByIngredients?ingredients=" + ingredientsArr[0] + ",+" + ingredientsArr[1] + ",+" + ingredientsArr[2] + ",+" + ingredientsArr[3] + ",+" + ingredientsArr[4] + ",+" + ingredientsArr[5] + ",+" + ingredientsArr[6] + ",+" + ingredientsArr[7] + ",+" + ingredientsArr[8] + "&apiKey=5f1feb82b9db4dad987ffd0fc801c43b")
  .then(function(response){
     return response.json();
   })
   .then(function(data){
   console.log(data);
   })
};

// function to generate a map
var generateMap = function(){
  // get the latitude and longitude coordinates used to center map on location
  navigator.geolocation.getCurrentPosition(function(position) {
    // assign lat and long values to variables
    var lat = position.coords.latitude;
    var long = position.coords.longitude;
    // assign the mapContainer div element to a variable
    var mapContainerEl = $('#mapContainer');
    // assign zipcode value to a variable
    zipCode = $('#zipCodeInput').val();
    // call the google embed maps api to create an iframe user the query grocery+near+zipcode, center on lat and long coordinates, and zoom level 10
    mapContainerEl.html(`<iframe width='450' height='250' frameborder='0' style='border:0' src= 'https://www.google.com/maps/embed/v1/search?key=AIzaSyBvqgE3J3k27e7smiiZAgKLa0bsGoNuHys&q=grocery+near+${zipCode}&center=${lat},${long}&zoom=10' allowfullscreen> </iframe>`);
    // create a div element with id of drive safe
    $('#driveSafeContainer')
      .append("<span>Drive<br>Safe!</span>");
  })
};
// event listener to generate map on zipcode submit
$('#zipCodeForm').submit(function(event){
  generateMap();
  event.preventDefault();
});


