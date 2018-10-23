const logButton = document.getElementById('log-button')
const regButton = document.getElementById('reg-button')
const exButton = document.getElementById('example-button')

const logPopUp = document.getElementById('log-pop')
const regPopUp = document.getElementById('reg-pop')
const exPopUp = document.getElementById('example-pop')

function showPopUp(el){
    const xButton = el.children[1]
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

logButton.addEventListener('click',()=>showPopUp(logPopUp))
regButton.addEventListener('click',()=>showPopUp(regPopUp))
exButton.addEventListener('click',()=>showPopUp(exPopUp))