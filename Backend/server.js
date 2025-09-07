import { GoogleGenerativeAI } from "@google/generative-ai";
import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.use(cors());
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname,"../Frontend/build")));
  
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

app.get("*", (req, res)=>{
  res.sendFile(path.join(__dirname, "../Frontend/build", "index.html"));
})

const PORT = process.env.PORT || 4000;

app.listen(PORT, ()=>{
  console.log(`Server is Listening on ${PORT}`);
})