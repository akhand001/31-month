import { useState } from "react";

export default function Envelopes() {

const [modalOpen, setModalOpen] = useState(false);
const [title, setTitle] = useState("");
const [message, setMessage] = useState("");

const letters = {
happy: "My love, seeing you happy is my favorite thing. Keep smiling! 🌟",
sad: "Remember that after every dark night, the sun rises. I am always here for you. 🤗",
missing: "Look up at the moon tonight. We are both looking at the same sky. I miss you too. ❤️",
mad: "Even if we fight sometimes, my love for you never changes. Let's talk and fix everything. 🥺"
};

function openLetter(type) {
setTitle(type.toUpperCase());
setMessage(letters[type]);
setModalOpen(true);
}

function closeModal() {
setModalOpen(false);
}

return (

<section className="section">

<h2 className="section-header">Open When You Are...</h2>

<div className="envelopes-grid">

<div className="envelope" onClick={() => openLetter("happy")}>
Happy
</div>

<div className="envelope" onClick={() => openLetter("sad")}>
Sad
</div>

<div className="envelope" onClick={() => openLetter("missing")}>
Missing Me
</div>

<div className="envelope" onClick={() => openLetter("mad")}>
Mad at Me
</div>

</div>

{/* Modal */}

{modalOpen && (

<div className="modal">

<div className="modal-content">

<span className="close-modal" onClick={closeModal}>
&times;
</span>

<h2 style={{marginBottom:"20px", color:"#ff2a6d"}}>
{title}
</h2>

<p style={{
fontFamily:"Dancing Script",
fontSize:"1.5rem",
lineHeight:"1.6"
}}>
{message}
</p>

</div>

</div>

)}

</section>

)

}