import {useState} from "react"

const promises = [

"I promise to always listen to you.",
"I promise to buy you food when you're hangry.",
"I promise to be your biggest fan.",
"I promise to love you forever."

]

export default function PromiseGenerator(){

const [text,setText] = useState("")

function generate(){

const random = promises[Math.floor(Math.random()*promises.length)]

setText(random)

}

return(

<section className="section">

<h2 className="section-header">Daily Promise</h2>

<button className="promise-btn" onClick={generate}>
Reveal a Promise
</button>

<p className="promise-display">{text}</p>

</section>

)

}