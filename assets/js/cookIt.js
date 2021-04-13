$("#saveButton").on("click", function () {
  alert("it clicked");
});
$("#saveButton").on("click", function () {
  alert("it clicked");
});
ingredientsArr = [];

//get value from ingredientName
$("#ingredientInput").submit(function (event) {
  // set value of the ingredient input to a variable
  var ingredient = $("#ingredientName").val();
  // append that ingredient to the list on the page
  $("#ingredientList").append("<li>" + ingredient + "</li>");
  // push the ingredient to an array
  ingredientsArr.push(ingredient);
  // clear the ingredient input after a submit
  $("#ingredientName").val("");
  spoonFetch();
  event.preventDefault();
});

// fetch("https://edamam-recipe-search.p.rapidapi.com/search?q=chicken&320262843fmsh4a1ae8efe85b19ap1f26d7jsn8212be03ceae")
//   .then(function(response){
//     return response.json();
//   })
//   .then(function(data) {
//       console.log(data);
//   })

var spoonFetch = function () {
  fetch(
    "https://api.spoonacular.com/recipes/findByIngredients?ingredients=" +
      ingredientsArr[0] +
      ",+" +
      ingredientsArr[1] +
      ",+" +
      ingredientsArr[2] +
      ",+" +
      ingredientsArr[3] +
      ",+" +
      ingredientsArr[4] +
      ",+" +
      ingredientsArr[5] +
      ",+" +
      ingredientsArr[6] +
      ",+" +
      ingredientsArr[7] +
      ",+" +
      ingredientsArr[8] +
      "&apiKey=5f1feb82b9db4dad987ffd0fc801c43b"
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    });
};

// function to generate a map
var generateMap = function () {
  // get the latitude and longitude coordinates used to center map on location
  navigator.geolocation.getCurrentPosition(function (position) {
    // assign lat and long values to variables
    var lat = position.coords.latitude;
    var long = position.coords.longitude;
    // assign the mapContainer div element to a variable
    var mapContainerEl = $("#mapContainer");
    // assign restaurant type option to a variable
    var restaurantType = $("#restaurantType").val();
    console.log(restaurantType);
    // assign zipcode value to a variable
    zipCode = $("#zipCodeInput").val();
    // if switch is turned to restaurant. search and display map with restaurants of that type
    if ($("#grocery-or-restaurant").is(":checked")) {
      mapContainerEl.html(
        `<iframe width='450' height='250' frameborder='0' style='border:0' src= 'https://www.google.com/maps/embed/v1/search?key=AIzaSyBvqgE3J3k27e7smiiZAgKLa0bsGoNuHys&q=${restaurantType}+restaurant+near+${zipCode}&center=${lat},${long}&zoom=10' allowfullscreen> </iframe>`
      );
      console.log(`restaurant type is: ${restaurantType}`);
    }
    // if switch is turned to grocery store. search and display map with nearby grocery stores
    else {
      mapContainerEl.html(
        `<iframe width='450' height='250' frameborder='0' style='border:0' src= 'https://www.google.com/maps/embed/v1/search?key=AIzaSyBvqgE3J3k27e7smiiZAgKLa0bsGoNuHys&q=grocery+near+${zipCode}&center=${lat},${long}&zoom=10' allowfullscreen> </iframe>`
      );
    }
    // create a div element with id of drive safe
    $("#driveSafeContainer").append("<span>Drive<br>Safe!</span>");
  });
};

$("#grocery-or-restaurant").change(function () {
  if ($(this).is(":checked")) {
    // change text of submit button
    $("#zipSubmitBtn").attr("value", "Find Restaurants");
    // insert div container
    $("<div id=selectContainer></div").insertAfter("#switchContainer");
    // create select element
    var restaurantSelectEl = $("<select>")
      .attr("id", "restaurantType")
      .attr("name", "restaurantType");
    // create options for select element
    var americanOptionEl = $("<option>")
      .html("American")
      .attr("value", "american");
    var chineseOptionEl = $("<option>")
      .html("Chinese")
      .attr("value", "chinese");
    var italianOptionEl = $("<option>")
      .html("Italian")
      .attr("value", "italian");
    var mexicanOptionEl = $("<option>")
      .html("Mexican")
      .attr("value", "mexican");
    var optionsArr = [
      americanOptionEl,
      chineseOptionEl,
      italianOptionEl,
      mexicanOptionEl,
    ];
    // append select option to container
    $("#selectContainer").append(restaurantSelectEl);
    // append options to select El
    for (var i = 0; i < optionsArr.length; i++) {
      $(restaurantSelectEl).append(optionsArr[i]);
    }
  } else {
    console.log("Checkbox unchecked");
    $("#selectContainer").remove();
    $("#zipSubmitBtn").attr("value", "Find Stores");
  }
});

// event listener to generate map on zipcode submit
$("#zipCodeForm").submit(function (event) {
  generateMap();
  event.preventDefault();
});
