const WebSocket = require('ws');

const server = new WebSocket.Server({ port: 8080 });

// Хранилище подключенных клиентов
const connectedClients = new Map();

server.on('connection', (ws) => {
  console.log('Новое соединение установлено');

  // Добавляем нового клиента в хранилище
  const clientId = Date.now(); // Можно использовать любой уникальный идентификатор
  connectedClients.set(ws, clientId);

  // Отправляем сообщение о новом клиенте всем подключенным клиентам
  broadcastMessage({ type: 'newClient', clientId });

  ws.on('message', (message) => {
    console.log(`Получено сообщение: ${message}`);

    // Парсим полученное сообщение в объект
    let receivedMessage;
    try {
      receivedMessage = JSON.parse(message);
    } catch (error) {
      console.error('Ошибка при парсинге сообщения:', error);
      return;
    }

    // Добавляем обработку различных типов сообщений
    if (receivedMessage.type === 'text') {
      // Если получено текстовое сообщение, отправляем его всем подключенным клиентам
      broadcastMessage({ type: 'message', ...receivedMessage });
    } else {
      // Если получено другое сообщение, отправляем ошибку обратно
      ws.send('Сервер не может обработать это сообщение');
    }
  });

  ws.on('close', () => {
    console.log('Соединение закрыто');

    // Удаляем клиента из хранилища
    connectedClients.delete(ws);

    // Отправляем сообщение о отключенном клиенте всем подключенным клиентам
    broadcastMessage({ type: 'clientDisconnected', clientId: connectedClients.get(ws) });
  });
});

function broadcastMessage(message) {
  for (const [client, clientId] of connectedClients) {
    client.send(JSON.stringify(message));
  }
}

console.log('Сервер WebSocket запущен на порту 8080');