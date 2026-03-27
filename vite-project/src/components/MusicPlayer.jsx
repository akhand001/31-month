import {useRef,useState} from "react"

export default function MusicPlayer(){

const audioRef = useRef()
const [playing,setPlaying] = useState(false)

function toggle(){

if(playing){
audioRef.current.pause()
}else{
audioRef.current.play()
}

setPlaying(!playing)

}

return(

<div className="music-player">

<audio ref={audioRef} src="/song.mp3"/>

<div className={`disk ${playing ? "playing":""}`}/>

<button onClick={toggle}>
{playing ? "Pause":"Play"}
</button>

</div>

)

}