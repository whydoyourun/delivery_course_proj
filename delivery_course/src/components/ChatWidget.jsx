import React, { useEffect } from 'react';

function ChatWidget() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://teleton.me/tools/chat.js';
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div>
      <h1>Мой компонент с чатом</h1>
      <div id="teleton-chat-widget-container"></div>
    </div>
  );
}

export default ChatWidget;
