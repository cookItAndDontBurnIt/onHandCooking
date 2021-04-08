ingredientsArr = [];

//get value from ingredientName
$('#ingredientInput').submit(function(event){
  var ingredient = $('#ingredientName').val();
  $('#ingredientList').append('<li>' + ingredient + '</li>');
  ingredientsArr.push(ingredient);
  $('#ingredientName').val('');
  event.preventDefault();
})