const express = require('express');
<<<<<<< HEAD
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;
require('dotenv').config();
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

// Enable CORS with specific settings
app.use(cors({
    origin: '*', // Allow all origins, adjust as needed
    methods: 'GET,POST,PUT,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type,Authorization'
}));

app.use(bodyParser.json());

let conversationHistory = [];

// Endpoint to provide shop locations and availability
app.get('/shops', (req, res) => {
    const shops = [
        { name: "TopTown Clothing - Location 1", address: "Location 1 Address", coordinates: { lat: -6.729424124389217, lng: 147.00264092344108 }, availability: "In stock" },
        { name: "TopTown Clothing - Location 2", address: "Location 2 Address", coordinates: { lat: -9.445403906252507, lng: 147.18496556396468 }, availability: "Limited stock" },
    ];
    res.json(shops);
});

app.post('/chat', async (req, res) => {
    const { message } = req.body;
    conversationHistory.push({ role: 'user', content: message });

    try {
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: 'gpt-3.5-turbo',
            messages: conversationHistory,
            temperature: 0.7, // Adjust personality here
        }, {
            headers: {
                'Authorization': `Bearer ${OPENAI_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        const chatResponse = response.data.choices[0].message.content;
        conversationHistory.push({ role: 'assistant', content: chatResponse });

        res.json({ response: chatResponse });
    } catch (error) {
        console.error('Error fetching response from OpenAI:', error);
        res.status(500).json({ error: 'Error fetching response from OpenAI' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
=======
const dotenv = require('dotenv');
const path = require('path');
const axios = require('axios');

dotenv.config();

const app = express();
const port = process.env.PORT || 3001; // Changed from 3000 to 3001

app.get('/api-key', (req, res) => {
    res.json({ apiKey: process.env.OPENAI_API_KEY });
});

app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
>>>>>>> e88682e (Add server.js)
