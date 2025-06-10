require('dotenv').config(); // Load environment variables from .env
const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const cors = require('cors');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Allow cross-origin requests from your frontend
app.use(express.json()); // Enable JSON body parsing for requests

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, '../public')));

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash-latest' }); // Use 'gemini-pro-vision' for multimodal if needed later

let chatHistory = []; // To maintain conversation context for the dream

// Helper function to reset chat history
function resetChatHistory() {
    chatHistory = [];
}

// Endpoint to start/continue a dream
app.post('/api/dream', async (req, res) => {
    const { prompt, reset } = req.body; // prompt can be initial seed or user's choice

    if (reset) {
        resetChatHistory();
    }

    if (!prompt) {
        return res.status(400).json({ error: 'Prompt is required.' });
    }

    try {
        const chat = model.startChat({
            history: chatHistory,
            generationConfig: {
                maxOutputTokens: 200, // Limit the length of generated dream segments
                temperature: 0.9, // Higher temperature for more creative/surreal output
                topK: 40,
                topP: 0.95,
            },
        });

        // Construct the message to send to Gemini
        let userMessage;
        if (chatHistory.length === 0) {
            // Initial dream seed
            userMessage = `Start a surreal, vivid dream based on this: "${prompt}". Keep it to 1-2 paragraphs. End by subtly hinting at a choice or a new element, without explicitly stating options.`;
        } else {
            // User's choice in an ongoing dream
            userMessage = `Continuing the dream, incorporate the element: "${prompt}". Describe what happens next in 1-2 paragraphs, maintaining the surreal and vivid tone. End by subtly hinting at a choice or a new element, without explicitly stating options.`;
        }

        const result = await chat.sendMessage(userMessage);
        const response = await result.response;
        const generatedText = response.text();

        // Update chat history with user's prompt and Gemini's response
        chatHistory.push({
            role: 'user',
            parts: [{ text: userMessage }]
        });
        chatHistory.push({
            role: 'model',
            parts: [{ text: generatedText }]
        });

        // Now, generate 2-3 new choices based on the *last generated dream segment*
        const choicePrompt = `Given the last dream segment: "${generatedText}", generate 3 distinct, surreal, and open-ended choices a dreamer could make to continue the dream. Each choice should be a short phrase. Format them as a numbered list. Example: "1. Follow the shimmering dust. 2. Inspect the glowing moss. 3. Call out to the shadowy figure."`;
        const choiceResult = await model.generateContent(choicePrompt);
        const choiceResponse = await choiceResult.response;
        const choicesText = choiceResponse.text();

        // Parse choices from the numbered list
        const choices = choicesText.split('\n')
                                   .filter(line => line.trim() !== '' && /^\d+\./.test(line))
                                   .map(line => line.replace(/^\d+\.\s*/, '').trim());


        res.json({ dreamText: generatedText, choices: choices });

    } catch (error) {
        console.error('Gemini API Error:', error);
        res.status(500).json({ error: 'Failed to generate dream. Please try again.' });
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
    console.log(`Serving static files from ${path.join(__dirname, '../public')}`);
});
