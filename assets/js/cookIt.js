var ingredientsArr = [];
//"b3bc54293df04bdfb125e107548ef2c9";  api key from marc
//"5f1feb82b9db4dad987ffd0fc801c43b";  api key from shay
//"d0adbcaa34cb468685be83f497a1e9e2"; api key from allan
// "2e4b6bc5d6184e9e8b5c439802aea9ef" forth api key
const apiKey = "2e4b6bc5d6184e9e8b5c439802aea9ef";
const baseUrl = `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${apiKey}&ingredients=`;
const testUrl = `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${apiKey}&number=3&ingredients=`;
const emojiAPIkey = `e1432e0eadfb00f31067af6479944e19744cbfe2`;
const emojiURL = `https://emoji-api.com/emojis?access_key=${emojiAPIkey}&search=`;

var savedRecipesArr = [];
var savedRecipeCount = 0;
$(document).foundation();

var loadRecipes = function () {
  savedRecipesArr = [];
  savedRecipes = [];
  var savedRecipes = localStorage.getItem('recipes');

  if (!savedRecipes) {
    return false;
  }
  else {
    console.log("Saved tasks found!");
    // parse into array of objects
    savedRecipes = JSON.parse(savedRecipes);
    // loop through savedRecipes array
    for (var i = 0; i < savedRecipes.length; i++) {
      $('<div>').attr('class', 'saved-recipe')
        .html(savedRecipes[i])
        .appendTo($('.savedRecipesContainer'));
      $('.savedRecipesContainer button').remove();
    }
    savedRecipes = [];
  }
};
//saved recipes event listener
$('#saveButton').on('click', loadRecipes);
//closing modal event listener
$('#closeX').on('click', function () {
  $('.savedRecipesContainer').html('');
});

//get value from ingredientName
$("#ingredientSubmit").click(function (event) {
  // set value of the ingredient input to a variable
  const ingredient = $("#ingredientName").val();
  // append that ingredient to the list on the page
  fetch(`${emojiURL}${ingredient}`).then((response) => response.json()).then((emojiResponseData) => {
    $("#ingredientList").append(`<li> ${ingredient}${emojiResponseData[0].character} </li>`);
  });
  // push the ingredient to an array
  ingredientsArr.push(ingredient);
  // clear the ingredient input after a submit and disable button
  $("#ingredientName").val("");
  $("#ingredientsClear").removeClass("disabled").removeAttr("disabled");
  $("#ingredientSubmit").prop("disabled", true).addClass("disabled");

  console.log(`Adding ingredient ${ingredient}`);
  fetchRecipes();
  event.preventDefault();
});

//event listener on the input box to change the disabled attribute on the add ingredient button
$("#ingredientName").on("keyup", function () {
  $("#ingredientSubmit")
    .prop("disabled", $.trim($(this).val()).length == 0)
    .removeClass("disabled");
});

//clears the ingredients array and disables the button
$("#ingredientsClear").click(function (event) {
  ingredientsArr = [];
  $("#ingredientList").html("");
  $(`#recipeInnerHtml`).html("");
  $("#ingredientsClear")
    .prop("disabled", ingredientsArr.length)
    .addClass("disabled");
});

function fetchRecipes() {
  let finalURL = testUrl;
  for (let i = 0; i < ingredientsArr.length; i++) {
    if (i == ingredientsArr.length - 1) {
      finalURL = `${finalURL}${ingredientsArr[i]}`;
    } else {
      finalURL = `${finalURL}${ingredientsArr[i]},+`;
    }
  }
  console.log(finalURL);
  fetch(`${finalURL}&addRecipeInformation=true`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      displayRecipes(data);
    });
}

var getRecipeSteps = function (arr) {
  for (let i = 0; i < arr.length; i++) {
    fetch(
      `https://api.spoonacular.com/recipes/${arr[i]}/analyzedInstructions?&apiKey=${apiKey}`
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (steps) {
        console.log(steps);
        if (steps.length === 0) {
          console.log("its empty");
          $(`#panel${arr[i]}`).append("<span> no cigar</span>");
          return;
        } else {
          for (let j = 0; j < steps[0].steps.length; j++) {
            $(`#panel${arr[i]}`).append(
              "<li>" + steps[0].steps[j].step + "</li>"
            );
          }
        }
      });
  }
};

var getRecipeIngredients = function (arr) {
  console.log(arr);
  for (var i = 0; i < arr.length; i++) {
    fetch(
      `https://api.spoonacular.com/recipes/${arr[i]}/ingredientWidget.json?&apiKey=${apiKey}`
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        if (data.length === 0) {
          console.log("its empty");
          $(`#panel${arr[i]}`).append("<span> no cigar</span>");
          return;
        } else {
          console.log(data.ingredients[0].name)
          console.log(data.ingredients.length)
          for (var j = 0; j < data.ingredients.length; j++) {
            $(`#panel${arr[j]} .ingredients-container`).append(
              `<li>${data.ingredients[j].amount.us.value} ${data.ingredients[j].amount.us.unit}  ${data.ingredients[j].name} 
                <img src="https://spoonacular.com/cdn/ingredients_100x100/${data.ingredients[j].image}"/>
              </li>
               `
            );
          }
        }
      });
  }
};

var recipeIdArr = [];

var displayRecipes = function (data) {
  let recipeHTML = `<ul class="tabs" data-responsive-accordion-tabs="tabs medium-accordion large-tabs" id="recipe-tabs">`;
  for (let i = 0; i < data.length; i++) {
    if (i == 0) {
      recipeHTML = `${recipeHTML}<li class="tabs-title is-active"><a href="#panel${data[i].id}" aria-selected="true">${data[0].title}</a></li>`;
    } else {
      recipeHTML = `${recipeHTML}<li class="tabs-title"><a href="#panel${data[i].id}">${data[i].title}</a></li>`;
    }
  }
  recipeHTML = `${recipeHTML}</ul>`;
  recipeHTML = `${recipeHTML}<div class="tabs-content" data-tabs-content="recipe-tabs">`;

  for (let i = 0; i < data.length; i++) {
    if (i == 0) {
      recipeHTML = `${recipeHTML}
                    <div class="tabs-panel is-active" id="panel${data[i].id}" recipeId="${data[i].id}">
                        <h2> ${data[i].title} </h2>
                        <img class="thumbnail" src="${data[i].image}">
                        <div class="steps-container">  </div>
                        <ul class="ingredients-container"></ul>
                        <button type='button' class='button' id='saveBtn${i}'>Save Recipe</button> 
                    </div>`;
    } else {
      recipeHTML = `${recipeHTML}
                    <div class="tabs-panel" id="panel${data[i].id}" recipeId="${data[i].id}">
                        <h2> ${data[i].title} </h2>
                        <img class="thumbnail" src="${data[i].image}">
                        <div class="steps-container">  </div>
                        <ul class="ingredients-container"></ul>
                        <button type='button' class='button' id='saveBtn${i}'>Save Recipe</button> 
                    </div>`;
    }
    recipeIdArr.push(data[i].id);
  }

  recipeHTML = `${recipeHTML}</div>`;
  $(`#recipeInnerHtml`).html(recipeHTML);

  //print the steps to the dom
  getRecipeSteps(recipeIdArr);
  getRecipeIngredients(recipeIdArr);
  recipeIdArr = [];

  $(`#saveBtn0`).on('click', function () {
    savedRecipesArr.push(document.getElementById(`panel${data[0].id}`).innerHTML)
    console.log(savedRecipesArr);
    localStorage.setItem('recipes', JSON.stringify(savedRecipesArr));
  });

  $(`#saveBtn1`).on('click', function () {
    savedRecipesArr.push(document.getElementById(`panel${data[1].id}`).innerHTML)
    console.log(savedRecipesArr);
    localStorage.setItem('recipes', JSON.stringify(savedRecipesArr));
  });

  $(`#saveBtn2`).on('click', function () {
    savedRecipesArr.push(document.getElementById(`panel${data[2].id}`).innerHTML)
    console.log(savedRecipesArr);
    localStorage.setItem('recipes', JSON.stringify(savedRecipesArr));
  });

  $(document).foundation();
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
