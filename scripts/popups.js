const logButton = document.getElementById('log-button')
const regButton = document.getElementById('reg-button')

const logPopUp = document.getElementById('log-pop')
const regPopUp = document.getElementById('reg-pop')

const nexts = Array.from(document.querySelectorAll('.next'))
const prevs = Array.from(document.querySelectorAll('.previous'))

const movieNum = document.getElementById('movie-num')

function showPopUp(el){
    const xButton = el.children[1].children[0]
    var mask = el.children[0]
    xButton.addEventListener('click',()=>hidePopUp(el))
    mask.addEventListener('click',()=>hidePopUp(el))

    el.style.display = 'flex'
    setTimeout(()=>el.style.opacity = 1,100)
}

function hidePopUp(el){
    el.style.opacity = 0
    setTimeout(()=>el.style.display = 'none',800)
}

let contentIndices = {"movie":1,"recipe":1,"restaurant":1}
function flipThroughContent(){
    if(currentUserId){
        document.getElementById('recipe-save-0').style.display = 'block'
    }
    const splitId = this.id.split("-")
    const contentType = splitId[0]
    
    const toNext = splitId[1] == 'next' ? true:false
    // contentType should be 'movie' 'recipe' or 'restaurant'
    const curCont = document.getElementById(contentType + contentIndices[contentType])
    if(toNext){
        contentIndices[contentType]++
        if(contentIndices[contentType] > 5){
            contentIndices[contentType] = 1
        }
    }
    else{
        contentIndices[contentType]--
        if(contentIndices[contentType] < 1){
            contentIndices[contentType] = 5
        }
    }
    const contNum = this.parentElement.children[5].children[0].children[0]
    contNum.innerHTML = contentIndices[contentType] + "/5"

    const nextCont = document.getElementById(contentType + contentIndices[contentType])

    curCont.style.opacity = 0
    setTimeout(()=>{
        curCont.style.display = 'none'
        nextCont.style.display = 'flex'
        setTimeout(()=>nextCont.style.opacity=1,100)
    },500)
}

logButton.addEventListener('click',()=>showPopUp(logPopUp))
regButton.addEventListener('click',()=>showPopUp(regPopUp))
nexts.forEach(nextButton => nextButton.addEventListener('click',flipThroughContent))
prevs.forEach(nextButton => nextButton.addEventListener('click',flipThroughContent))