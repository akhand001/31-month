import {useState} from "react"

export default function LoveNote(){

const [note,setNote] = useState("")

return(

<section className="section">

<h2 className="section-header">Leave a Love Note</h2>

<textarea
className="love-note"
value={note}
onChange={(e)=>setNote(e.target.value)}
placeholder="Write something from your heart..."
/>

</section>

)

}