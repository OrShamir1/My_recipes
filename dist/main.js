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
    for(let i = 0; i < numberOfPagesNeeded; i++) {
        pagesNameArray.push(i);
    }
    return pagesNameArray;
}

$("#submit").on('click', function (){
    getRecipes().then(recpicesData => {
        $("#recipes-container").empty()
        $("#user-input").val("")
        const numberOfpages = createNewPages(recpicesData)
        for(let i = 0; i < 5; i++) {
            const title = recpicesData[i].title
            const picture = recpicesData[i].thumbnail
            const idMeal = recpicesData[i].idMeal
            const ingredients = recpicesData[i].ingredients
            const youtubeUrl = recpicesData[i].href
            const youtubeVideoId = youtubeUrl.split("=")
            const embedUrl = `https://www.youtube.com/embed/` + youtubeVideoId[1]
            renderer.renderRecipe(title, picture, embedUrl, ingredients, idMeal)
        }
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
