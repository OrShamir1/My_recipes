const express = require('express')
const router = express.Router()
const axios = require('axios');

const findDairyIngredient = function (recipesArray) {
    dairyIngredients = ["Cream", "Cheese", "Milk", "Butter", "Creme", "Ricotta", "Mozzarella", "Custard", "Cream Cheese"];
    for (let dairy of dairyIngredients) {
        for (let recipeIndex in recipesArray) {
            let recipeIngredient = recipesArray[recipeIndex].ingredients
            recipeIngredient.find(i => {
                if (i == dairy) {
                    recipesArray.splice(recipeIndex, 1);
                }
            })
        }
    }
}

const findGlutanIngredient = function (recipesArray) {
    glutenIngredients = ["Flour", "Bread", "spaghetti", "Biscuits", "Beer"];
    for (let glutan of glutenIngredients) {
        for (let recipeIndex in recipesArray) {
            let recipeIngredient = recipesArray[recipeIndex].ingredients
            recipeIngredient.find(i => {
                if (i == glutan) {
                    recipesArray.splice(recipeIndex, 1);
                }
            })
        }
    }
}
router.get(`/recipes/:ingredient`, function (req, res) {
    const filterParams = req.query;
    const ingredient = req.params.ingredient
    axios.get(`https://recipes-goodness-elevation.herokuapp.com/recipes/ingredient/${ingredient}?`)
        .then((recipes) => {
            if (!recipes.data.results.length) {
                res.status(404).send({ "Error": `We don't have any avilable recepies with ${ingredient}` })
                return
            }
            const recipesList = recipes.data.results;
            if (filterParams.dairy == 'true') {
                findDairyIngredient(recipesList)
            }
            if (filterParams.gluten == 'true') {
                findGlutanIngredient(recipesList)
            }
            console.log(recipesList);
            res.send(recipesList)
        })

})

module.exports = router