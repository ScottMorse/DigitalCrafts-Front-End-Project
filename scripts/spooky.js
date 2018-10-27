let spookyPulseButton = document.querySelector("#spin.pulse-button")
let spookyToggleButton = document.getElementById("spookyToggleButton")


spookyToggleButton.addEventListener("click", toggleSpooky)

let musIntvl
let spookTune
let spookFound = false
function toggleSpooky(){
  spookyPulseButton.classList.toggle('spooky')
  document.head.children.forEach(child => {
    if(child.id == "spooky"){
      document.head.removeChild(document.head.lastChild)
      clearInterval(musIntvl)
      spookTune.pause()
      spookTune.currentTime = 0
      spookFound = true
    }
  })
  if(!spookFound){
    const spookyCss = document.createElement('link')
    spookyCss.id = "spooky"
    spookyCss.rel = "stylesheet"
    spookyCss.href = "styles/spooky.css"
    document.head.appendChild(spookyCss)
    spookTune = playAudio('audio/spooky.mp3')
    musIntvl = setInterval(()=>{
      spookTune = new Audio('audio/spooky.mp3')
      spookTune.volume = 0.3
      spookTune.play()
    },14400)
  }
  spookFound = false
}

const todaysDate = new Date()

if(todaysDate.getMonth() == 9 && todaysDate.getDate() == 31){
   toggleSpooky()
}
