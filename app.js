require('dotenv').config();
const express = require('express');
const Sentiment = require('sentiment');
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
const sentiment = new Sentiment();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY || "NO_KEY");

app.use(express.static('public'));
app.use(express.json());

// 1. المحرك المحلي (مخصص للأتمتة ✅)
app.get('/analyze-local', (req, res) => {
    const text = req.query.text || "";
    const result = sentiment.analyze(text);
    const mood = result.score > 0 ? 'Positive 😊' : result.score < 0 ? 'Negative ☹️' : 'Neutral 😐';
    res.json({ sentiment: mood, score: result.score, source: 'Local' });
});

// 2. محرك Gemini (للإبهار التقني 🚀)
app.get('/analyze-gemini', async (req, res) => {
    const text = req.query.text || "";
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const result = await model.generateContent(`Analyze sentiment: ${text}`);
        res.json({ sentiment: result.response.text(), source: 'Gemini AI' });
    } catch (error) {
        res.status(500).json({ error: "Gemini not configured or offline" });
    }
});

module.exports = app;