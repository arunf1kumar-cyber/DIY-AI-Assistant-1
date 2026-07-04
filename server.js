import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// OpenAI setup (API key comes from .env file)
const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

// AI Chat endpoint
app.post("/chat", async (req, res) => {
    try {
        const userMessage = req.body.message;

        const response = await client.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                {
                    role: "system",
                    content: "You are a helpful DIY AI assistant for students, coding, electronics, and projects."
                },
                {
                    role: "user",
                    content: userMessage
                }
            ]
        });

        res.json({
            reply: response.choices[0].message.content
        });

    } catch (error) {
        console.log("Error:", error);
        res.status(500).json({
            reply: "AI server error"
        });
    }
});

// Start server
app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
