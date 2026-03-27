import {useEffect,useRef} from "react"

export default function GalaxyCanvas(){

const canvasRef = useRef()

useEffect(()=>{

const canvas = canvasRef.current
const ctx = canvas.getContext("2d")

canvas.width = window.innerWidth
canvas.height = window.innerHeight

let stars=[]

for(let i=0;i<120;i++){

stars.push({
x:Math.random()*canvas.width,
y:Math.random()*canvas.height,
size:Math.random()*2
})

}

function draw(){

ctx.clearRect(0,0,canvas.width,canvas.height)

stars.forEach(star=>{
ctx.beginPath()
ctx.arc(star.x,star.y,star.size,0,Math.PI*2)
ctx.fillStyle="white"
ctx.fill()
})

requestAnimationFrame(draw)

}

draw()

},[])

return <canvas id="universe" ref={canvasRef}></canvas>

}