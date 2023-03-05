const renderer = new Renderer()
let currentrecipesData = []
const getRecipes = function () {
    const dairyCheckBox = $("#dairy-checkbox")[0].checked
    const glutenCheckBox = $("#gluten-checkbox")[0].checked
    const WantedIngredient = $("input").val()
    return $.get(`recipes/${WantedIngredient}?dairy=${dairyCheckBox}&gluten=${glutenCheckBox}`)
}
const numerOfNeededPages = function (recpicesData) {
    const pageAmount = (recpicesData.length / 5)
    const pagesNamesArray = []
    for (let i = 1; i < pageAmount; i++) {
        pagesNamesArray.push(i);
    }
    return pagesNamesArray;
}

const renderNewPage = function (recpicesData, pageNum) {
    $("#recipes-container").empty()
    const numberOfItemsInOnePage = 5;
    let topindexToRender = pageNum * numberOfItemsInOnePage;
    const lowIndexToRender = (topindexToRender - numberOfItemsInOnePage);
    for (let i = lowIndexToRender; i < topindexToRender; i++) {
        const title = recpicesData[i].title
        const picture = recpicesData[i].thumbnail
        const idMeal = recpicesData[i].idMeal
        const ingredients = recpicesData[i].ingredients
        const youtubeUrl = recpicesData[i].href
        const youtubeVideoId = youtubeUrl.split("=")
        const embedUrl = `https://www.youtube.com/embed/` + youtubeVideoId[1]
        renderer.renderRecipe(title, picture, embedUrl, ingredients, idMeal)
    }
}

$("#submit").on('click', function () {
    getRecipes().then(recpicesData => {
        currentrecipesData = recpicesData;
        $("#pages-container").empty()
        $("#user-input").val("")
        const numberOfPages = numerOfNeededPages(recpicesData)
        renderNewPage(recpicesData, 1)
        renderer.renderPageCounter(numberOfPages)
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
    const pageNumber = $(this).attr("id");
    renderNewPage(currentrecipesData, pageNumber)
})
