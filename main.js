Parse.initialize("5WU2sZvYs4FchYPRBxnjRMJtCkzrKiidYynu82PJ", "ZolmoQCozPcqCUyjPQiUfvCIYKfCRUB3THTmrFBd");
 
$(document).ready(function(){
 
	$('.getrecipe').click( function(){ //call back function, will not run until something has completed
 
		var id = $('.recipe-id').val()
 
		var url = 'recipe/' + id + '.json'
		
		console.log(url);
 
		$.getJSON(url, function(data){
			console.log(data);
 
			renderRecipe(data);
		});
 
	});

	$('.save-recipe').click(function(){
    var attributes = {};
    attributes.name = $('.name').val();
    attributes.description = $('.description').val();
 
    var Recipe = Parse.Object.extend('Recipe');
    var newRecipe = new Recipe();

    newRecipe.save(attributes, {
      success: function(recipe){
      	window.fetchedRecipe = recipe;
        console.log('saved your recipe! awesome!');
      }
    })
 
 
  })
 
	var renderRecipe = function(recipe){
		$('h1').text(recipe.name);
		$('p').text(recipe.description);
	};
 
  
 
 

  $('.search').click(function(){
	  	var Recipe = Parse.Object.extend("Recipe");
			var query = new Parse.Query(Recipe);

			query.contains("description", "a");
			query.find({
			success: function(results) {
			alert("Successfully retrieved " + results.length + " recipes.");
			},
			error: function(error) {
			alert("Error: " + error.code + " " + error.message);
			}
		});
  })

});