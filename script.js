// Fetch data from the API
fetch('https://api.yourdomain.com/policy')
    .then(response => response.json())
    .then(data => {
        document.getElementById('policy').textContent = data.policy;
    })
    .catch(error => console.error('Error fetching API data:', error));

// Chatbot functionality
let conversationHistory = [];

async function sendMessage() {
    const userInput = document.getElementById('userInput').value;
    const messagesDiv = document.getElementById('messages');
    const chatbotName = "Zara";

    messagesDiv.innerHTML += `<p class="user-message">User: ${userInput}</p>`;
    document.getElementById('userInput').value = '';

    conversationHistory.push({ role: 'user', content: userInput });

    try {
        const response = await fetch('https://api.yourdomain.com/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: userInput, history: conversationHistory })
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        conversationHistory.push({ role: 'assistant', content: data.response });

        messagesDiv.innerHTML += `<p class="assistant-message">${chatbotName}: ${data.response}</p>`;
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
    } catch (error) {
        console.error('Error sending message:', error);
        messagesDiv.innerHTML += `<p class="error-message">Error: ${error.message}</p>`;
    }
}
