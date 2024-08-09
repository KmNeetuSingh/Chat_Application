const socket = new WebSocket('ws://localhost:8080');

const output = document.getElementById('output');
const input = document.getElementById('input');
const sendButton = document.getElementById('send');

// Prompt user for a username
const username = prompt('Enter your username:');
socket.onopen = function() {
    socket.send(`${username} has joined the chat`);
};

// Send message when the "Send" button is clicked
sendButton.addEventListener('click', sendMessage);

// Also send message when the Enter key is pressed
input.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

function sendMessage() {
    const message = input.value.trim();
    if (message !== '') {
        // Display the message in the chat window before sending it
        displayMessage(`${username}: ${message}`, true);
        socket.send(`${username}: ${message}`);
        input.value = '';
    }
}

function displayMessage(message, isYou) {
    const messageElement = document.createElement('div');
    const messageClass = isYou ? 'message you' : 'message other';
    messageElement.className = `message ${messageClass}`;
    messageElement.innerHTML = message;
    output.appendChild(messageElement);
    output.scrollTop = output.scrollHeight;  // Scroll to the bottom
}

socket.onmessage = function(event) {
    const isYou = event.data.startsWith(`${username}:`);
    displayMessage(event.data, isYou);
};
