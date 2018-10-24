const restButton = document.getElementById('check-restaurants')
const recipeButton = document.getElementById('check-recipes')
const movieButton = document.getElementById('check-movies')

const moviePopUp = document.getElementById('movie-pop')
const restaurantPopUp = document.getElementById('restaurant-pop')
const recipePopUp = document.getElementById('recipe-pop')

restButton.addEventListener('click',()=>showPopUp(restaurantPopUp))
recipeButton.addEventListener('click',()=>showPopUp(recipePopUp))
movieButton.addEventListener('click',()=>showPopUp(moviePopUp))