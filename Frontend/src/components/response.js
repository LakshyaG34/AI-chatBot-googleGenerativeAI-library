import React, {useState} from "react"
import "./response.css"

const Response = () =>
{
    const [prompt, setPrompt] = useState("");
    const [res, setRes] = useState("");

    const handleSubmit = async(e) =>{
        e.preventDefault();
        const response = await fetch("http://localhost:4000/api/gen",{
            method : "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ prompt }),
        });
        const data = await response.json();
        console.log("Data from Backend :-", data);
        setPrompt("");
        setRes(data.text);
    }
    return(
        <div className="response">
            <form onSubmit = {handleSubmit} className = "response-form">
                <input placeholder = "Enter your Prompt" type="text" value={prompt} onChange={(e)=>setPrompt(e.target.value)} className="response-input"/>
                <button type="submit" className="response-button">Generate</button>
            </form>
            <span className = "response-generated">{res}</span>
        </div>
    )
}

export default Response;