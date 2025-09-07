import { GoogleGenerativeAI } from "@google/generative-ai";
import express from "express"
import dotenv from "dotenv"
import cors from "cors"

dotenv.config();

const app = express();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.use(cors());
app.use(express.json());

app.get("/api/get", (req, res)=>{
  res.send("server is running")
})
  
app.post("/api/gen", async(req, res)=>{
  try{
    const {prompt} = req.body;
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(`${prompt}. Give answer in 1-2 lines`);
    res.json({text : result.response.text()});
  }catch(err)
  {
    console.log("Internal Server Error", err);
    res.status(500).json({error : "Cannot send"})
  }
  
})

app.listen(4000, ()=>{
  console.log("Server is Listening on 4000");
})