<<<<<<< HEAD
$("#saveButton").on("click", function () {
  alert("it clicked");
});
=======
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
  event.preventDefault();
});

fetch("https://edamam-recipe-search.p.rapidapi.com/search?q=chicken&320262843fmsh4a1ae8efe85b19ap1f26d7jsn8212be03ceae")
  .then(function(response){
    return response.json();
  })
  .then(function(data) {
      console.log(data);
  })
>>>>>>> feature/submit-ingredient
