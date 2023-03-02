const renderer = new Renderer()
const getRecipes = function() {
    const dairyCheckBox = $("#dairy-checkbox")[0].checked
    const glutenCheckBox = $("#gluten-checkbox")[0].checked
    const WantedIngredient = $("input").val()
    return $.get(`recipes/${WantedIngredient}?dairy=${dairyCheckBox}&gluten=${glutenCheckBox}`)       
}

$("#submit").on('click', function (){
    getRecipes().then(recpicesData => {
        $("#recipes-container").empty()
        $("#user-input").val("")
        for(let i = 0; i < 10; i++) {
            const title = recpicesData[i].title
            const picture = recpicesData[i].thumbnail
            const idMeal = recpicesData[i].idMeal
            const ingredients = recpicesData[i].ingredients
            const youtubeUrl = recpicesData[i].href
            const youtubeVideoId = youtubeUrl.split("=")
            const embedUrl = `https://www.youtube.com/embed/` + youtubeVideoId[1]
            renderer.renderRecipe(title, picture, embedUrl, ingredients, idMeal)
        }

    })  
})

$("body").on('click', '.play-button-outer', function () {
    const videoId =  $(this).data().video
    $(`#${videoId}`).addClass("active")
})
$("body").on('click', '.close-button', function () {
    $(".video-player").removeClass("active")
})
