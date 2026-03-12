const audio = document.getElementById("song")
const startBtn = document.getElementById("startBtn")
const intro = document.getElementById("intro")
const lyricLine = document.getElementById("lyricLine")

/* lyric timing */

const lyrics = [
{time:25, text:"eyes looking back at me"},
{time:32, text:"golden skin turns to greed"},
{time:39, text:"i can't be what i reach for"},
{time:47.8, text:"a shell you can't adore"},

{time:58, text:"why can't you need me"},
{time:62, text:"need me like i need you ?"},
{time:74, text:"why can't you love me"},
{time:78, text:"love me like you used to ?"},

{time:89, text:"your eyes, gaze into mine"},
{time:96.4, text:"but sparks don't seem to fly"},
{time:102, text:"when i'm around"},
{time:109, text:"but when you hear her sound"},
{time:116.4, text:"no matter what i try"},

{time:122.4, text:"why can't you need me"},
{time:126, text:"need me like i need you"},
{time:138, text:"why can't you love me"},
{time:142.5, text:"love me like you used to ?"},
{time:154.5, text:"i want to feel"},
{time:160.4, text:"like i belong in my own skin"},
{time:170, text:"to be enough for you."}
]

audio.addEventListener("timeupdate",()=>{

let current = audio.currentTime

for(let i=0;i<lyrics.length;i++){

if(current >= lyrics[i].time){
lyricLine.innerText = lyrics[i].text
}

}

})

/* start button */

startBtn.onclick = ()=>{

intro.style.display="none"

audioCtx.resume()
audio.play()

animateVisualizer()

}

/* visualizer */

const visualizer = document.querySelector(".visualizer")

const BAR_COUNT = 48

for(let i=0;i<BAR_COUNT;i++){
const bar=document.createElement("div")
visualizer.appendChild(bar)
}

const bars = document.querySelectorAll(".visualizer div")

const audioCtx = new (window.AudioContext || window.webkitAudioContext)()
const analyser = audioCtx.createAnalyser()
const source = audioCtx.createMediaElementSource(audio)

source.connect(analyser)
analyser.connect(audioCtx.destination)

analyser.fftSize = 128

const dataArray = new Uint8Array(analyser.frequencyBinCount)

function animateVisualizer(){

analyser.getByteFrequencyData(dataArray)

bars.forEach((bar,i)=>{

const value=dataArray[i]/255
const height=value*37

bar.style.height=height+"px"

})

requestAnimationFrame(animateVisualizer)

}

/* profile tabs */

const tabs = document.querySelectorAll(".tab")
const infoText = document.getElementById("infoText")

const tabContent = {

music:
"deftones · clairo · snow strippers · the marias · i listen to everything :p",

pokemon:
"scyther. i like everything though",

games:
"roblox · valo · overwatch · rhythm games",

sites:
"html · css · javascript · learning to design"

}

tabs.forEach(tab=>{

tab.addEventListener("click",()=>{

tabs.forEach(t=>t.classList.remove("active"))

tab.classList.add("active")

const key = tab.dataset.tab

infoText.classList.add("fade")

setTimeout(()=>{
infoText.innerText = tabContent[key]
infoText.classList.remove("fade")
},200)

})

})