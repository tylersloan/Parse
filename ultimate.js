Parse.initialize("5WU2sZvYs4FchYPRBxnjRMJtCkzrKiidYynu82PJ", "ZolmoQCozPcqCUyjPQiUfvCIYKfCRUB3THTmrFBd");

Recipes = Parse.Object.extend('Recipes');
recipe = new Recipes();

$(document).ready(function() {
  console.log("You're doing great.");
  listAllRecipes();
});

var listAllRecipes = function() {
  $('.js-recipes-container').show();
  $('.js-single-recipe').hide();
  $('.editing').hide();

  var query = new Parse.Query(Recipes);

  query.find({
    success: function(result) {
      window.allrecipes = result

      renderRecipesList(result);

      console.log(result);

      console.log("Magic! " + result.length + " recipes have been returned.")
    },
      error: function(error) {
        alert("Error: " + error.code + " " + error.message);
      }
  });
}

var renderRecipesList = function(recipes) {
  $('.js-recipes-container').html(" ");

  for (var i = 0; i < recipes.length; i++) {
    var id = allrecipes[i].id
    var name = '<h3>' + allrecipes[i].get('name') + '</h3>';
    var description = '<p>' + allrecipes[i].get('description') + '</p>';

    var li = $('<li id = "' + id + '">' + name + description + '</li>').click(function() {
    var id = $(this).attr('id');
    console.log(id);

        query = new Parse.Query(Recipes);

        query.get(id, {
          success: function(result) {

            console.log(result.get('name'));

            var name = '<h2>' + result.get('name') + '</h2>';
            var description = '<p>' + result.get('description') + '</p>';
            var ingredients = '<li>' + result.get('ingredients') + '</li>';
            var calories = '<li>' + result.get('calories') + '</li>';

            renderSingleRecipe(result)
            $('.js-single-recipe').html(name + description + ingredients + calories);

            $('.back').click(function() {
              listAllRecipes();
            })

          }

          
        })
    })

    $('.js-recipes-container').append(li);
    
  }
}

var renderSingleRecipe = function(recipe) {
  $('.js-recipes-container').hide();
  $('.js-single-recipe').show();
  $('.editing').show();
}