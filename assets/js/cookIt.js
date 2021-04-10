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
            //data.image, data.title,
            // data.
            
            
        });
}
