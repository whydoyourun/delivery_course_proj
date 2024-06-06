import React, { useEffect } from 'react';

const ChatWidget = () => {
  useEffect(() => {
    // Загрузка скрипта чата
    const script = document.createElement('script');
    script.src = '//teleton.me/tools/chat.js';
    script.async = true;
    document.body.appendChild(script);

    // Очистка эффекта при размонтировании компонента
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div id="teleton-chat"></div>
  );
};

export default ChatWidget;