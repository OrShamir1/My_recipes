const express = require('express');
const axios = require('axios');
const path = require('path');
app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.static(path.join(__dirname,'node_modules')));

const findDairyIngredient = function (recipesArray) {
    dairyIngredients = ["Cream","Cheese","Milk","Butter","Creme","Ricotta","Mozzarella","Custard","Cream Cheese"];
    for(let dairy of dairyIngredients) {
        for(let recipeIndex in recipesArray) {
            let recipeIngredient = recipesArray[recipeIndex].ingredients
            recipeIngredient.find(i => {
                if(i == dairy) {
                    recipesArray.splice(recipeIndex, 1);
                }
            })
        }
    }
}

const findGlutanIngredient = function (recipesArray) {
    glutenIngredients = ["Flour","Bread","spaghetti","Biscuits","Beer"];
    for(let glutan of glutenIngredients) {
        for(let recipeIndex in recipesArray) {
            let recipeIngredient = recipesArray[recipeIndex].ingredients
            recipeIngredient.find(i => {
                if(i == glutan) {
                    recipesArray.splice(recipeIndex, 1);
                }
            })
        }
    }
}
app.get(`/recipes/:ingredient`, function (req, res) {
    const filterParams = req.query;
    const ingredient = req.params.ingredient
    axios.get(`https://recipes-goodness-elevation.herokuapp.com/recipes/ingredient/${ingredient}?`)
        .then((recipes) => {
            if(!recipes.data.results.length) {
                res.status(404).send({"Error" : `We don't have any avilable recepies with ${ingredient}`})
                return
            }
            const recipesList = recipes.data.results;
            if(filterParams.dairy == 'true') {
                findDairyIngredient(recipesList)
            }
            if(filterParams.gluten == 'true') {
                findGlutanIngredient(recipesList)
            }
            res.send(recipesList)  
    })
    
})
const port = 3000
app.listen(port, function () {
    console.log(`Server running on ${port}`);
})