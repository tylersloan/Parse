Parse.initialize("5WU2sZvYs4FchYPRBxnjRMJtCkzrKiidYynu82PJ", "ZolmoQCozPcqCUyjPQiUfvCIYKfCRUB3THTmrFBd");

Recipes = Parse.Object.extend('Recipes'); 

$(document).ready(function() {

  var query = new Parse.Query(Recipes);
  query.find({
    success: function(results) {

      window.recipes = results;

      renderRecipesList(results)

      console.log("These are the recipes you're looking for..." + results.length);
    },
    error: function(error) {

      alert("What the...! Where'd they go?!?" + error.code + " " + error.message)
    }
  });
});

var renderRecipesList = function(recipes) {
   console.log('Look! Your stuff is here!', recipes)



  for (i = 0; i < recipes.length; i++) {
    var id = recipes[i].id
    var name = '<h3>' + recipes[i].get('name') + '</h3>';
    var description = '<p>' + recipes[i].get('description') + '</p>';

    var li = $('<li id="' + id + '">' + name + " " + description + '</li>').click(function() {
      var id = $(this).attr('id')
      console.log(id)

      var query = new Parse.Query(Recipes);

      query.get(id, {
        success: function(result){

          console.log(result.get('name'));
        }
      })
    })     

    $('.js-recipes-container ul').append(li)
  }
 }

var renderSingleRecipe = function(recipe) {
  $('.js-recipes-container').hide()
  $('.js-single-recipe').show()
};