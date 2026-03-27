export default function BottleMessage(){

const poems=[
"You are my sun, my moon, and all my stars.",
"In a sea of people my eyes search for you.",
"I see my whole life in your eyes."
]

function openBottle(){

const random=poems[Math.floor(Math.random()*poems.length)]

alert(random)

}

return(

<div className="bottle-container">

<button className="bottle-btn" onClick={openBottle}>
🍾
</button>

</div>

)

}