const loader = document.getElementById('loader')
const loadMask = document.getElementById('load-mask')

function runIntro(){
    setTimeout(()=>loadMask.style.transform = 'translateX(3000px)',100)
    setTimeout(()=>{
        loader.style.opacity = 0
        setTimeout(()=>loader.style.display="none",1400)
    },1400)
}

window.addEventListener('load',runIntro)