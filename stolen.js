// when the document is loaded
$(document).ready(function(){
  
	// pass in a callback function when the show recipes button is clicked
	$('.get-all').click(function(){
		//clear the container of existing stuff
		$('.recipes-container').html('');
		$('.get-all').css('visibility', 'hidden');
		
		// store the url for json to use
		var url = '/recipe/recipes.json';
		
		// get info from json file url, call it data
		$.getJSON(url, function(data){
			//cycle through data array
			for (var i = 0, max = data.length; i < max; i++){
				//console log each element
				console.log(data[i]);
				//append each element
				renderRecipe(data[i]);
			}
		})
	})
});
 
// define renderRecipe function and pass in some data (this particular data describes a recipe)
var renderRecipe = function(recipe){
	
	//set text between text tags to the name of the recipe, etc.
	var h2 = $('<h2></h2>').text(recipe.name);
	var p1 = $('<p></p>').text('Description:' + " " + recipe.description);
	var p2 = $('<p></p>').text('Ingredients:' + " " + recipe.ingredients);
 
	//append the heading 
	$('.recipes-container').append(h2);
 
	// if you click on a recipe
	$(h2).click(function(){
		$('.get-all').css('visibility', 'visible');
		//clear everything
		$('.recipes-container').html('');
		//print the recipe, description, and ingredients of the thing you clicked
		$('.recipes-container').append(h2).append(p1).append(p2);
		
 
	})
 
}