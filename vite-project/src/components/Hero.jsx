import {useEffect,useState} from "react"

export default function Hero(){

const startDate = new Date("2025-11-27")

const [time,setTime] = useState({d:0,h:0,m:0,s:0})

useEffect(()=>{

const interval = setInterval(()=>{

const now = new Date()
const diff = now-startDate

setTime({
d:Math.floor(diff/(1000*60*60*24)),
h:Math.floor((diff/(1000*60*60))%24),
m:Math.floor((diff/1000/60)%60),
s:Math.floor((diff/1000)%60)
})

},1000)

return ()=>clearInterval(interval)

},[])

return(

<section className="hero">

<h1 className="title-glitch">
Aditya & Sakshi
</h1>

<p className="subtitle">
INFINITE LOVE • ETERNAL BOND
</p>

<div className="chronometer">

<div className="time-box">
<span className="time-val">{time.d}</span>
<span className="time-lbl">Days</span>
</div>

<div className="time-box">
<span className="time-val">{time.h}</span>
<span className="time-lbl">Hours</span>
</div>

<div className="time-box">
<span className="time-val">{time.m}</span>
<span className="time-lbl">Minutes</span>
</div>

<div className="time-box">
<span className="time-val">{time.s}</span>
<span className="time-lbl">Seconds</span>
</div>

</div>

</section>

)

}
