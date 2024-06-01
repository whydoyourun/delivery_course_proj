function WebSocketClient() {
    this.ws = null;

    this.connect = () => {
        this.ws = new WebSocket('ws://localhost:8080');

        this.ws.onopen = () => {
            console.log('Соединение с WebSocket установлено');
        };

        this.ws.onmessage = (event) => {
        };

        this.ws.onclose = () => {
            console.log('Соединение с WebSocket закрыто');
        };
    };

    this.sendMessage = (message) => {
        if (this.ws && this.ws.readyState === WebSocket.OPEN) {
            this.ws.send(message);
        } else {
            console.log('Соединение с WebSocket не установлено или закрыто');
        }
    };

    this.disconnect = () => {
        if (this.ws) {
            this.ws.close();
        }
    };
}

const webSocketClient = new WebSocketClient();

function connectToWebSocketServer() {
    webSocketClient.connect();
}

function sendMessage() {
    const messageInput = document.getElementById('messageInput');
    const message = messageInput.value.trim();
    if (message) {
        webSocketClient.sendMessage(message);
        messageInput.value = '';
    }
}

export default {WebSocketClient}