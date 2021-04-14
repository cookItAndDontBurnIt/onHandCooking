const ingredientsArr = ["apple", "corn", "feta cheese"];
const apiKey = "5f1feb82b9db4dad987ffd0fc801c43b";
const baseUrl = `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${apiKey}&ingredients=`;


//get value from ingredientName
$('#ingredientSubmit').click(function (event) {
    // set value of the ingredient input to a variable
    const ingredient = $('#ingredientName').val();
    // append that ingredient to the list on the page
    $('#ingredientList').append('<li>' + ingredient + '</li>');
    // push the ingredient to an array
    ingredientsArr.push(ingredient);
    // clear the ingredient input after a submit
    $('#ingredientName').val('');
    console.log(`Adding ingredient ${ingredient}`);
    fetchRecipes();
    event.preventDefault();
});

function fetchRecipes() {
    let finalURL = baseUrl;
    for (let i = 0; i < ingredientsArr.length; i++) {
        if (i == ingredientsArr.length - 1) {
            finalURL = `${finalURL}${ingredientsArr[i]}`;
        } else {
            finalURL = `${finalURL}${ingredientsArr[i]},+`;
        }
    }
    fetch(finalURL)
        .then(response => response.json())
        .then((data) => {
            console.log(data);

            let recipeHTML = `<ul class="tabs" data-responsive-accordion-tabs="tabs medium-accordion large-tabs" id="recipe-tabs">`;
            for (let i = 0; i < data.length; i++) {
                if (i == 0) {
                    recipeHTML = `${recipeHTML}<li class="tabs-title is-active"><a href="#panel0" aria-selected="true">${data[0].title}</a></li>`;
                } else {
                    recipeHTML = `${recipeHTML}<li class="tabs-title"><a href="#panel${i}">${data[i].title}</a></li>`;
                }
            }
            recipeHTML = `${recipeHTML}</ul>`;
            recipeHTML = `${recipeHTML}<div class="tabs-content" data-tabs-content="recipe-tabs">`;

            for (let i = 0; i < data.length; i++) {
                if (i == 0) {
                    recipeHTML = `${recipeHTML}
                    <div class="tabs-panel is-active" id="panel${i}">
                        <h2> ${data[i].title} </h2>
                        <img class="thumbnail" src="${data[i].image}">
                    </div>`;
                } else {
                    recipeHTML = `${recipeHTML}
                    <div class="tabs-panel" id="panel${i}">
                        <h2> ${data[i].title} </h2>
                        <img class="thumbnail" src="${data[i].image}">
                    </div>`;
                }
            }
            recipeHTML = `${recipeHTML}</div>`;
            $(`#recipeInnerHtml`).html(recipeHTML);
            $(document).foundation();
            // data[]
            //data.image, data.title,
            // data.usedIngredients[] / data.unusedIngredients[]:
            //  {
            //      amount
            //      name,
            //      unit
            //}

        });
}

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