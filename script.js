const ws = new WebSocket('ws://localhost:3000');
const chatBox = document.getElementById('chat-box');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');

ws.onmessage = (event) => {
    const message = JSON.parse(event.data);
    displayMessage(message.user, message.text);
};

sendButton.addEventListener('click', () => {
    sendMessage();
});

messageInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        sendMessage();
    }
});

function sendMessage() {
    const text = messageInput.value.trim();
    if (text === '') return;

    const message = {
        user: 'user',
        text: text
    };

    ws.send(JSON.stringify(message));
    messageInput.value = '';
    displayMessage('user', text);
}

function displayMessage(user, text) {
    const messageElement = document.createElement('div');
    messageElement.className = `message ${user}`;
    messageElement.innerHTML = `<div class="text">${text}</div>`;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
}
