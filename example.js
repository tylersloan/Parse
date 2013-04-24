Parse.initialize("5WU2sZvYs4FchYPRBxnjRMJtCkzrKiidYynu82PJ", "ZolmoQCozPcqCUyjPQiUfvCIYKfCRUB3THTmrFBd");
console.log('test')
/*when the document is loaded*/

Recipe = Parse.Object.extend('Recipe');
recipe = new Recipe()


$(document).ready(function(){
	console.log('test');
	getRecipeList()
});	


var getRecipeList = function() {
	
	$('.js-recipes-container').show()
	$('.js-single-recipe').hide()

	var query = new Parse.Query(Recipe);
	query.find({
	  success: function(results) {

	  	// save all my recipes in window.recipes
	  	window.recipes = results

	  	// render all the recipes into the page
	  	renderRecipeList(results)

	  	console.log(results);
	    alert("Successfully retrieved " + results.length);
	  },
	  error: function(error) {
	    alert("Error: " + error.code + " " + error.message);
	  }
	});


}

	/*This renders an array of recipes into the page*/
var renderRecipeList = function(recipes){
	$('.js-recipes-container ul').html("");
	console.log('Here are my recipes:', recipes);
	
	/*loop through the array, and put each objects name into an <li> in the page*/
	for (var i = 0; i < recipes.length; i++) {
		var id = recipes[i].id
		var name = '<h1>' + recipes[i].get('name') + '</h1>';
		var description = '<p>' + recipes[i].get('description') + '</p>';

		var li = $('<li id="' + id + '">'+name+description+'</li>').click(function(){
			var id = $(this).attr('id');
			console.log(id);

			query = new Parse.Query(Recipe);

			query.get(id,{
				success:function(result) {
					
					/*do something here*/
					console.log(result.get('name'));

					var name = '<h1>' + result.get('name') + '</h1>';
					var description = '<p>' + result.get('description') + '</p>';

					renderSingleRecipe(result)
					$('.js-single-recipe').html(name+description)

					$('.update').click(function(){
						var updatedDescription = $('.recipe-description').val();
						result.set('description', updatedDescription);
						console.log(result)
						result.save()
					});
					$('.Back-to-Recipes').click(function(){
						getRecipeList();
					});
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



