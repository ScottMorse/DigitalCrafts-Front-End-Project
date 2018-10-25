

let result
// let userInput = document.getElementById('userInput')
// function getRecipesFromIngredient(ingredientName){
  //fetch request with correct url
  //fetch(`https://api.edamam.com/search?q=${ingredientName}&app_id=8e3c8927&app_key=2b4db69ee5e91a3ca5d9abe068e41287&from=0&to=5&calories=600-1000&Diet=balanced`)
  // return hits
// }

const ingredientTextBox = document.getElementById('ingredientTextBox')
const ingredientForm = document.getElementById('ingredientForm')
const ingredientSelector = document.getElementById('ingredient-selector')
const recipeEls = Array.from(document.querySelectorAll('.recipe'))

let userIngredient
function getUserIngredient(e){
    e.preventDefault()
    userIngredient = ingredientTextBox.value
    ingredientTextBox.value = ""
    ingredientTextBox.placeholder = "Loading..."
    console.log(userIngredient)
    fetch(`https://api.edamam.com/search?q=${userIngredient}&app_id=8e3c8927&app_key=2b4db69ee5e91a3ca5d9abe068e41287&from=0&to=5&calories=600-1000&Diet=balanced`)
    .then(response=>response.json())
    .then(foodjson=>{
      result=foodjson
      ingredientSelector.style.opacity = 0
      setTimeout(()=>{
        ingredientSelector.style.display = 'none'
      },800)
      console.log(result.hits)
      const hits = result.hits
      let ri = 1
      recipeEls.forEach(recipeEl => {
          const recipeObj = result.hits[ri - 1]
          recipeObj.masterKey = ri - 1
          masterObject.recipe.push(recipeObj)
          recipeEl.children[1].innerHTML = recipeObj.recipe.label
          recipeEl.children[2].style.backgroundImage = 'url(' + recipeObj.recipe.image + ')'
          recipeEl.children[3].href = recipeObj.recipe.url
          ri ++
      })
      console.log(masterObject)
   })
}

ingredientForm.addEventListener('submit',getUserIngredient)

// function textInput(){
//   recipeHits = getRecipesFromIngredient(textBox.value)
//
// fetch("https://api.edamam.com/search?q=italian&app_id=8e3c8927&app_key=2b4db69ee5e91a3ca5d9abe068e41287&from=0&to=10&calories=1000-1500&Diet=balanced")
// .then(response=>response.json())
// .then(foodjson=>{
//   result=foodjson
//   // console.log(foodjson)
//   console.log(result.hits)
//
//   const hits = result.hits
//
//   let foodList = document.getElementById("foodList")
//   let foodListLength = result.hits.length
//   console.log(foodListLength)
//
//   hits.forEach(hit => {
//     foodList.insertAdjacentHTML('beforeend', `
//     <label>${hit.recipe.label}</label>
//     <img src=${hit.recipe.image}>
//     <a href="${hit.recipe.url}"></a>
//
//
//     `)
//   })

  // foodList.insertAdjacentHTML('beforeend', `
  // <label>${hit.recipe.label}</label>
  // <img src=${hit.recipe.image}"">
  // <label>${hit.recipe.url}</label>
  //
  //
  // `)

  // for (let i=0; i < foodListLength; i++ ) {
  //  foodList.insertAdjacentHTML('beforeend', foodItem(i)) ;
  // }
  //
  // function foodItem(i) {return `
  // <li><h2>${hits[i].hits.recipe.label}</h2></li>
  // <img src=${hits[i].recipe.image} />
  // <label>${hits[i].recipe.url}<label>
  //
  //   `

  // }

// })
