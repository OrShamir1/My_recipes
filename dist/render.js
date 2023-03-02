class Renderer {
    constructor() {}

    renderRecipe(title, picture, embedUrl, ingredients, idMeal) {
        
        const source = $("#recipe-template").html()
        const template = Handlebars.compile(source)
        const recipe = template({title: title, picture: picture, embedUrl: embedUrl, ingredients: ingredients, mealId: idMeal})
        $("#recipes-container").append(recipe)
    }
}
