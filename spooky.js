let spookyPulseButton = document.querySelector("#spin.pulse-button")
let spookyToggleButton = document.getElementById("spookyToggleButton")


spookyToggleButton.addEventListener("click", function(){
  spookyPulseButton.classList.toggle('spooky')
  if(document.head.lastChild.id == "spooky"){
    document.head.removeChild(document.head.lastChild)
  }
  else{
    const spookyCss = document.createElement('link')
    spookyCss.id = "spooky"
    spookyCss.rel = "stylesheet"
    spookyCss.href = "styles/spooky.css"
    document.head.appendChild(spookyCss)
  }
})
