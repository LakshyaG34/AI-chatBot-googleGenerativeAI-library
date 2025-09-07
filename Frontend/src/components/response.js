import React, {useState} from "react"

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
            <form onSubmit = {handleSubmit}>
                <input placeholder = "Enter your Prompt" type="text" value={prompt} onChange={(e)=>setPrompt(e.target.value)}/>
                <button type="submit">Generate</button>
            </form>
            <span>{res}</span>
        </div>
    )
}

export default Response;