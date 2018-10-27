const wholeToneScale = ['E3.mp3','D3.mp3','C3.mp3','Bb2.mp3','Ab2.mp3','Gb2.mp3']

function playAudio(filePath){
    const noteAudio = new Audio(filePath)
    noteAudio.volume = 0.3
    noteAudio.play()
    return noteAudio
}

