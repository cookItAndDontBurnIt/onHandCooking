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


fetch("https://www.maps.googleapis.com/maps/api/js?key=AIzaSyBvqgE3J3k27e7smiiZAgKLa0bsGoNuHys&grocery")
 .then(function(response){
  return response.json();
 })
 .then(function(data){
   console.log(data);
 })