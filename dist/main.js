const renderer = new Renderer()
const getRecipes = function() {
    const dairyCheckBox = $("#dairy-checkbox")[0].checked
    const glutenCheckBox = $("#gluten-checkbox")[0].checked
    const WantedIngredient = $("input").val()
    return $.get(`recipes/${WantedIngredient}?dairy=${dairyCheckBox}&gluten=${glutenCheckBox}`)       
}
const createNewPages = function (recpicesData) {
    const numberOfPagesNeeded = (recpicesData.length / 5)
    const pagesNameArray = []
    for(let i = 1; i < numberOfPagesNeeded; i++) {
        pagesNameArray.push(i);
    }
    return pagesNameArray;
}

const renderNewPage = function(recpicesData, pageNum) {
    $("#recipes-container").empty()
    let TopindexToRender = 0;
    if(pageNum > 0) {
        TopindexToRender = pageNum * 5;
    }
    else if(pageNum == 0) {
        TopindexToRender = 5; 
    }
    for(let i = (TopindexToRender - 5); i < TopindexToRender; i++) {
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
let currentrecipesData = []
$("#submit").on('click', function (){
    getRecipes().then(recpicesData => {
        currentrecipesData = recpicesData;
        $("#user-input").val("")
        const numberOfpages = createNewPages(recpicesData)
        renderNewPage(recpicesData, 1)
        renderer.renderPageCounter(numberOfpages)
    }).catch(err => {
        const serverErrorMassage = err.responseJSON.Error
        alert(serverErrorMassage)
    })
})

$("body").on('click', '.play-button-outer', function () {
    const videoId =  $(this).data().video
    $(`#${videoId}`).addClass("active")
})
$("body").on('click', '.close-button', function () {
    $(".video-player").removeClass("active")
})

$("body").on('click', ".page-number", function () {
    const pageNumber = $(this).attr("id");
    renderNewPage(currentrecipesData, pageNumber)

})
