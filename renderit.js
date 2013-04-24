Parse.initialize("5WU2sZvYs4FchYPRBxnjRMJtCkzrKiidYynu82PJ", "ZolmoQCozPcqCUyjPQiUfvCIYKfCRUB3THTmrFBd");

Recipe = Parse.Object.extend('Recipe');
recipe = new Recipe()	

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
				success: function(result) {
					//do something here
					console.log(result.get('name'));

					var name = '<h2>' + result.get('name') + '</h2>';
					var description = '<p>' + result.get('description') + '</p>';
					var ingredients = '<li>' + result.get('ingredients') + '</li>';

					renderSingleRecipe(result)
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