import React, { useState } from 'react';
import { Layout, Input, Button, Divider, Spin } from 'antd';

const { Content } = Layout;
const { TextArea } = Input;

const NotificationPage = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [subject, setSubject] = useState('');
  const [email, setEmail] = useState('');

  const handleSend = async () => {
    setLoading(true);

    try {
      // Здесь необходимо добавить логику отправки email
      console.log('Отправляем уведомление:');
      console.log('Subject:', subject);
      console.log('Email:', email);
      console.log('Message:', message);

      // Сбрасываем форму после успешной отправки
      setSubject('');
      setEmail('');
      setMessage('');
    } catch (error) {
      console.error('Ошибка отправки уведомления:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <Content style={{ padding: '24px' }}>
        <h1>Отправка уведомления</h1>
        <Divider />
        <Input
          placeholder="Тема"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          style={{ marginBottom: '16px' }}
        />
        <TextArea
          placeholder="Сообщение"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={5}
          style={{ marginBottom: '16px' }}
        />
        <Button type="primary" onClick={handleSend} loading={loading}>
          Отправить
        </Button>
      </Content>
    </Layout>
  );
};

export default NotificationPage;