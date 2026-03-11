const bubbles=document.querySelectorAll(".bubble")

function revealRandom(){

const hidden=[...bubbles].filter(b=>b.classList.contains("hidden"))

if(hidden.length===0)return

const pick=hidden[Math.floor(Math.random()*hidden.length)]

pick.classList.remove("hidden")
pick.classList.add("show")

}

setInterval(revealRandom,1500)