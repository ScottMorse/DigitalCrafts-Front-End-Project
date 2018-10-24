const loader = document.getElementById('loader')
const loadMask = document.getElementById('load-mask')

function runIntro(){
    setTimeout(()=>loadMask.style.transform = 'translateX(100vw)',100)
    setTimeout(()=>{
        loader.style.opacity = 0
        setTimeout(()=>loader.style.display="none",1000)
    },1000)
}

window.addEventListener('load',runIntro)