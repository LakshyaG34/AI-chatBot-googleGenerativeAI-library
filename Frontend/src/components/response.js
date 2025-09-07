import React, {useState} from "react"
import "./response.css"

const Response = () =>
{
    const [prompt, setPrompt] = useState("");
    const [res, setRes] = useState("");
    const [isTyping, setIsTyping] = useState(false);

    const handleSubmit = async(e) =>{
        e.preventDefault();
        setRes("");
        setIsTyping(true);

        try{
        const response = await fetch("/api/gen",{
            method : "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ prompt }),
        });
        const data = await response.json();
        const text = data.text;

        let i = -1;
        const interval = setInterval(()=>{
            setRes((prev) => prev + text.charAt(i));
            i++;
            if(i >= text.length)
            {
                clearInterval(interval);
                setIsTyping(false);
            }
        }, 50);
        }catch(err)
        {
            console.error(err);
            setRes("Error: " + err.message);
            setIsTyping(false);
        }
    }
    
    return(
        <div className="response">
            <form onSubmit = {handleSubmit} className = "response-form">
                <input placeholder = "Enter your Prompt" type="text" value={prompt} onChange={(e)=>setPrompt(e.target.value)} className="response-input"/>
                <button type="submit" className="response-button">Generate</button>
            </form>
            <div className="response-generated">
                {res}
                {isTyping && <span className = "response-pulse">|</span>}
            </div>
        </div>
    )
}

export default Response;