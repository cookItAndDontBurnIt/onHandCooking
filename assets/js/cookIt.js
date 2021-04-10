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