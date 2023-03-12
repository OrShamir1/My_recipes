const renderer = new Renderer()
const NUM_OF_ITEMS_IN_ONE_PAGE = 5;
let currentRecipesData = []
const getRecipes = function () {
    const dairyCheckBox = $("#dairy-checkbox")[0].checked
    const glutenCheckBox = $("#gluten-checkbox")[0].checked
    const WantedIngredient = $("input").val()
    return $.get(`recipes/${WantedIngredient}?dairy=${dairyCheckBox}&gluten=${glutenCheckBox}`)
}
const numberOfNeededPages = function (recpicesData) {
    const pageAmount = (recpicesData.length / NUM_OF_ITEMS_IN_ONE_PAGE)
    const pagesNamesArray = []
    for (let i = 1; i < pageAmount; i++) {
        pagesNamesArray.push(i);
    }
    return pagesNamesArray;
}

const renderNewPage = function (recipesData, pageNum) {
    $("#recipes-container").empty()
    let topIndexToRender = pageNum * NUM_OF_ITEMS_IN_ONE_PAGE;
    const lowIndexToRender = (topIndexToRender - NUM_OF_ITEMS_IN_ONE_PAGE);
    for (let i = lowIndexToRender; i < topIndexToRender; i++) {
        const recipeData = recipesData[i]
        const title = recipeData.title
        const picture = recipeData.thumbnail
        const idMeal = recipeData.idMeal
        const ingredients = recipeData.ingredients
        const youtubeUrl = recipeData.href
        const youtubeVideoId = youtubeUrl.split("=")
        const embedUrl = `https://www.youtube.com/embed/` + youtubeVideoId[1]
        renderer.renderRecipe(title, picture, embedUrl, ingredients, idMeal)
    }
}


$("#submit").on('click', function () {
    getRecipes().then(recpicesData => {
        currentRecipesData = recpicesData;
        $("#pages-container").empty()
        $("#user-input").val("")
        const numberOfPages = numberOfNeededPages(recpicesData)
        renderNewPage(recpicesData, 1)
        renderer.renderPageCounter(numberOfPages)
        $("#1").addClass("active")
    }).catch(err => {
        const serverErrorMassage = err.responseJSON.Error
        alert(serverErrorMassage)
    })
})

$("body").on('click', '.play-button-outer', function () {
    const videoId = $(this).data().video
    $(`#${videoId}`).addClass("active")
})
$("body").on('click', '.close-button', function () {
    $(".video-player").removeClass("active")
})

$("body").on('click', ".page-number", function () {
    $(".page-number").removeClass("active")
    $(this).addClass("active")
    const pageNumber = $(this).attr("id");
    renderNewPage(currentRecipesData, pageNumber)
})
