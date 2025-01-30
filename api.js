const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Endpoint to fetch the user data deletion policy
app.get('/api/policy', (req, res) => {
    res.json({
        policy: "At ZaraHive, we value your privacy and are committed to protecting your personal data. If you wish to delete your data associated with ZaraHive, please follow the steps below..."
    });
});

// Endpoint to submit a data deletion request
app.post('/api/delete-request', (req, res) => {
    const { email, reason } = req.body;
    // Process the deletion request
    res.json({ message: 'Data deletion request submitted successfully.' });
});

// Endpoint to retrieve AI Agent information
app.get('/api/ai-agents', (req, res) => {
    res.json([
        { id: 1, name: 'AI Agent 1', description: 'Description of AI Agent 1' },
        { id: 2, name: 'AI Agent 2', description: 'Description of AI Agent 2' }
    ]);
});

app.listen(port, () => {
    console.log(`API running at http://localhost:${port}`);
});
