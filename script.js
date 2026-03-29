const audio = document.getElementById("song")
const startBtn = document.getElementById("startBtn")
const intro = document.getElementById("intro")
const lyricLine = document.getElementById("lyricLine")

/* lyric timing */

const lyrics = [
{time:8, text:"break and bleed"},
{time:11.5, text:"what'd you do to me"},
{time:13.2, text:"i can hardly breathe"},
{time:16, text:"take and leave all you want from me"},

{time:21.5, text:"i can hardly feel"},
{time:24.3, text:"over this time again"},
{time:26, text:"i don't wanna make amends"},
{time:28.1, text:"i know it's gonna end"},

{time:30, text:"keep rushing me, rushing me close"},
{time:32.5, text:"don't think i'm dumb or plain"},
{time:34, text:"know everything you tried to bend"},
{time:36.3, text:"but i'll stay quiet hoping that you would- that you would- know"},
{time:42, text:"i'm done with your lies"},

{time:45.6, text:"say all you want this time"},
{time:49.5, text:"i wanna go somewhere, far away"},
{time:56.3, text:"don't wanna keep you close"},
{time:58, text:"all you do is hurt me most"},
{time:60.1, text:"one shot it's overdose"},
{time:62.2, text:"poison feel it in my bones"},
{time:64.8, text:"to soon to die, no tears to cry"},

{time:72.4, text:"break and bleed"},
{time:76, text:"what'd you do to me, i can hardly breathe"},
{time:80, text:"take and leave all you want from me"},
{time:85.7, text:"i can hardly feel"},
{time:88.7, text:"over this time again"},
{time:90, text:"i don't wanna make amends"},
{time:92, text:"i know it's gonna end, keep rushing me- rushing me- close"},

{time:96, text:"don't think I'm dumb or plain"},
{time:98, text:"know everything you tried to bend"},
{time:100, text:"but I'll stay quiet, hoping that you would- that you would- know"},
{time:104, text:"why have i"},
{time:107.5, text:"been keeping up with your lies"},
{time:110, text:"(i'm such a fool right now)"},
{time:112.4, text:"said goodbye, but you haunting me with your dark eyes"},

{time:120, text:"故事結局要抵達"},
{time:122.2, text:"他根本不愛她"},
{time:124, text:"刪掉照片又暗自"},
{time:126, text:"再載回來像個笑話"},
{time:128.4, text:"i screwed but realized"},
{time:130.4, text:"we better off as friends"},
{time:132, text:"those bruises herb of grace, would it reprise?"},

{time:136, text:"break and bleed"},
{time:139.1, text:"what'd you do to me"},
{time:142.5, text:"i can hardly breathe"},
{time:144, text:"take and leave"},
{time:147, text:"all you want from me"},
{time:149, text:"i can hardly feel"},
{time:151.6, text:"over this time again"},

{time:154.1, text:"i don't want to make amends"},
{time:156.5, text:"i know it's gonna end, keep rushing me- rushing me- close"},
{time:160.2, text:"don't think I'm dumb or plain"},
{time:161.7, text:"know everything you tried to bend"},
{time:164.4, text:"but I'll stay quiet"},
{time:165.4, text:"hoping that you would- that you would- know."}

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
"deftones · clairo · snow strippers · ptv · the marias · i listen to everything :p",

pokemon:
"i could name all 800 pokemon if you wanted me to",

games:
"roblox · valo · overwatch · rhythm games",

about:
"i'm chronically online, i like music and games & i love my friends."

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