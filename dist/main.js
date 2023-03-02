const renderer = new Renderer()
const getRecipes = function() {
    const dairyCheckBox = $("#dairy-checkbox")[0].checked
    const glutenCheckBox = $("#gluten-checkbox")[0].checked
    const WantedIngredient = $("input").val()
    return $.get(`recipes/${WantedIngredient}?dairy=${dairyCheckBox}&gluten=${glutenCheckBox}`)       
}

$("#submit").on('click', function (){
    getRecipes().then(recpicesData => {
        const title = recpicesData[0].title
        const picture = recpicesData[0].thumbnail
        const idMeal = recpicesData[0].idMeal
        const ingredients = recpicesData[0].ingredients
        const youtubeUrl = recpicesData[0].href
        const youtubeVideoId = youtubeUrl.split("=")
        const embedUrl = `https://www.youtube.com/embed/` + youtubeVideoId[1]
        renderer.renderRecipe(title, picture, embedUrl, ingredients, idMeal)
    })  
})

$("body").on('click', '.play-button-outer', function () {
    const videoId =  $(this).data().video
    $(`#${videoId}`).addClass("active")
})
$("body").on('click', '.close-button', function () {
    $(".video-player").removeClass("active")
})
