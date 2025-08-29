// main.js

document.addEventListener('DOMContentLoaded', () => {
    // Placeholder function for starting tests (replace with actual logic)
    function startTest(testType) {
        console.log(`Starting test: ${testType}`);
        // Example: redirect to a test page or show a test modal
        // window.location.href = `/test/${testType}`;
        // Example modal implementation:
        // const modal = document.createElement('div');
        // modal.className = 'modal';
        // modal.innerHTML = `<div class="modal-content"><h2>${testType} Test</h2><p>Starting ${testType} test...</p><button class="close-btn">Close</button></div>`;
        // document.body.appendChild(modal);
        // attachTestModalListeners(); // Call to attach listeners for modal buttons
    }

    // Clear chat messages
    function clearChat() {
        const chatMessages = document.getElementById('chatMessages');
        if (chatMessages) {
            chatMessages.innerHTML = '';
            console.log('Chat cleared');
            // Optionally, add initial AI message back
            const initialMessage = document.createElement('div');
            initialMessage.className = 'message ai-message';
            initialMessage.innerHTML = `
                <div class="message-avatar"><i class="fas fa-robot"></i></div>
                <div class="message-content">
                    <p><strong>Dutch:</strong> Hallo! Ik ben je Nederlandse AI-tutor. Hoe gaat het met je?</p>
                    <p><strong>English:</strong> Hello! I'm your Dutch AI tutor. How are you doing?</p>
                </div>`;
            chatMessages.appendChild(initialMessage);
        }
    }

    // Send message to AI (placeholder for API integration)
    async function sendMessage() {
        const chatInput = document.getElementById('chatInput');
        const chatMessages = document.getElementById('chatMessages');
        if (chatInput && chatInput.value.trim() && chatMessages) {
            const message = chatInput.value;

            // Add user message to chat
            const userMessage = document.createElement('div');
            userMessage.className = 'message user-message';
            userMessage.innerHTML = `<div class="message-content"><p>${message}</p></div>`;
            chatMessages.appendChild(userMessage);

            // Simulate AI response (replace with actual API call)
            const aiResponse = await fetchAIResponse(message);
            const aiMessage = document.createElement('div');
            aiMessage.className = 'message ai-message';
            aiMessage.innerHTML = `
                <div class="message-avatar"><i class="fas fa-robot"></i></div>
                <div class="message-content">
                    <p><strong>Dutch:</strong> ${aiResponse.dutch}</p>
                    <p><strong>English:</strong> ${aiResponse.english}</p>
                </div>`;
            chatMessages.appendChild(aiMessage);

            chatInput.value = '';
            chatMessages.scrollTop = chatMessages.scrollHeight; // Scroll to bottom
        }
    }

    // Placeholder for AI API call
    async function fetchAIResponse(message) {
        console.log(`Sending to AI: ${message}`);
        // Replace with actual API call to xAI's API or similar
        return {
            dutch: 'Dit is een voorbeeldantwoord in het Nederlands.',
            english: 'This is a sample response in English.'
        };
        // Example API call:
        // const response = await fetch('https://api.x.ai/grok', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({ message })
        // });
        // return response.json();
    }

    // Handle Enter key press for chat input
    function handleChatKeyPress(event) {
        if (event.key === 'Enter') {
            sendMessage();
        }
    }

    // Send suggestion message
    function sendSuggestion(message) {
        console.log(`Sending suggestion: ${message}`);
        const chatInput = document.getElementById('chatInput');
        if (chatInput) {
            chatInput.value = message;
            sendMessage();
        }
    }

    // Event listeners
    document.getElementById('start-learning-btn').addEventListener('click', () => {
        scrollToSection('grammar');
    });

    document.getElementById('chat-ai-btn').addEventListener('click', () => {
        scrollToSection('chat');
    });

    document.getElementById('start-quick-test').addEventListener('click', () => {
        startTest('quick');
    });

    document.getElementById('start-full-test').addEventListener('click', () => {
        startTest('full');
    });

    document.getElementById('start-topic-test').addEventListener('click', () => {
        startTest('topic');
    });

    document.getElementById('clear-chat-btn').addEventListener('click', () => {
        clearChat();
    });

    document.getElementById('send-message-btn').addEventListener('click', () => {
        sendMessage();
    });

    document.getElementById('chatInput').addEventListener('keypress', (event) => {
        handleChatKeyPress(event);
    });

    document.getElementById('sugg1').addEventListener('click', () => {
        sendSuggestion('Hoe heet je?');
    });

    document.getElementById('sugg2').addEventListener('click', () => {
        sendSuggestion('Wat is het weer vandaag?');
    });

    document.getElementById('sugg3').addEventListener('click', () => {
        sendSuggestion('Kun je me helpen?');
    });
});