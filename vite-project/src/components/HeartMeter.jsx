import {useState} from "react"

export default function HeartMeter(){

const [value,setValue] = useState(100)

return(

<section className="section">

<h2 className="section-header">How Much Do You Love Me?</h2>

<input
type="range"
min="0"
max="100"
value={value}
onChange={(e)=>setValue(e.target.value)}
className="heart-slider"
/>

<p className="heart-text">Infinity ♾️</p>

</section>

)

}