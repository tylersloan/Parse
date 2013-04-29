// Get all recipes from DB before that. – getRecipes()
		// go find all recipes on Parse
		// pass that array into listRecipes()

// View all recipes. – listRecipes(recipes)
		// loop through array of recipes
			// render each recipe in <li> 
			// just display name & description
			// set up click event for showSingleRecipe()
		// set up click event to show addNewRecipe form
				// hide all containers and show inputs with placeholder text
				// save(recipe)

// Be able to click on recipe to view more info on it. – showSingleRecipe(recipe)
		// show more info of the recipe
		// set up click event to show edit forms

// showEditForm(recipe) 
		// hide single recipe container and show recipe info IN inputs

// save(recipe) 
		// get info from each input and use recipe.set()
		// call recipe.save()
			// re-render the recipe with showSingleRecipe()

Parse.initialize("5WU2sZvYs4FchYPRBxnjRMJtCkzrKiidYynu82PJ", "ZolmoQCozPcqCUyjPQiUfvCIYKfCRUB3THTmrFBd");

Recipe = Parse.Object.extend('Recipe');
recipe = new Recipe();

$(document).ready(function(){
	console.log('test');
	getRecipeList();	
});

var getRecipeList = function() {

	$('.js-recipes-container').show()
	$('.js-single-recipe').hide()

	var query = new Parse.Query(Recipe);
	
	query.find({
		success: function(results) {
		
		// save all recipes in window.allrecipes
		window.allrecipes = results
		
		// render all the recipes into the page
		renderRecipeList(results)

		console.log("Successfully retrieved " + results.length + " recipes.");
	},
		error: function(error) {
			alert("Error: " + error.code + " " + error.message);
		}
	});
}

var renderRecipeList = function(recipes) {
	$('.js-recipes-container ul').html("");
	console.log('Here are my recipes: ', allrecipes);

	// this makes it start at recipe [0] and get all til there are no more.
	for (var i = 0; i < recipes.length; i++) {
		var id = allrecipes[i].id
		var name = '<h3>' + allrecipes[i].get('name') + '</h3>';
		var description = '<p>' + allrecipes[i].get('description') + '</p>';
		
		var li = $('<li id="' + id + '">'+name+description+'</li>').click(function(){
		var id = $(this).attr('id')
			console.log(id);

			query = new Parse.Query(Recipe);

			query.get(id, {
				success: function(results) {
					//do something here
					console.log(results.get('name'));

					var name = '<h2>' + results.get('name') + '</h2>';
					var description = '<p>' + results.get('description') + '</p>';
					var ingredients = '<li>' + results.get('ingredients') + '</li>';

					renderSingleRecipe(results)
					$('.js-single-recipe').html(name + description + ingredients);

					$('.update').click(function(){
						result.set('name', $('.edit-name').val())
						result.set('description', $('.edit-description').val())
						result.set('ingredients', $('.edit-ingredients').val())
						console.log(result)
						result.save();
					});

					$('.back').click(function() {
						getRecipeList();
					})

				}
			})
		})

		$('.js-recipes-container ul').append(li);
	}

}

// render just one recipe
var renderSingleRecipe = function(recipe) {
	$('.js-recipes-container').hide()
	$('.js-single-recipe').show()
}