import React, { useState } from 'react';
import { Layout, Table, Input, Button, Modal, Avatar, List } from 'antd';
import { Typography } from 'antd';

const { Header, Content, Sider } = Layout;
const { Search } = Input;
const { Title, Paragraph, Text } = Typography;

// Данные пользователей
const users = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    chats: [
      { id: 1, message: 'Hello!', sender: 'John Doe' },
      { id: 2, message: 'How are you?', sender: 'John Doe' },
      { id: 3, message: 'I need help with something.', sender: 'you' },
    ],
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    chats: [
      { id: 1, message: 'Hi there!', sender: 'Jane Smith' },
      { id: 2, message: 'Can we discuss the project?', sender: 'Jane Smith' },
      { id: 3, message: 'I have an idea I want to share.', sender: 'Jane Smith' },
    ],
  },
  // Добавьте больше пользователей по мере необходимости
];

const AdminDashboard = () => {
  const [filteredUsers, setFilteredUsers] = useState(users);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState('');

  const handleSearch = (value) => {
    const filtered = users.filter((user) =>
      user.name.toLowerCase().includes(value.toLowerCase()) ||
      user.email.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  const handleUserClick = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleSendMessage = () => {
    if (selectedUser && message.trim() !== '') {
      // Добавляем новое сообщение в массив сообщений пользователя
      const updatedChats = [...selectedUser.chats, { id: selectedUser.chats.length + 1, message, sender: selectedUser.name }];
      const updatedUser = { ...selectedUser, chats: updatedChats };

      // Обновляем данные пользователя в массиве users
      const updatedUsers = users.map((user) => (user.id === updatedUser.id ? updatedUser : user));
      setFilteredUsers(updatedUsers);
      setSelectedUser(updatedUser);

      // Очищаем поле ввода сообщения
      setMessage('');
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <Layout>
      <Header>
        <Title level={3}>Admin Dashboard</Title>
      </Header>
      <Layout>
        <Sider width="100%" style={{ background: '#fff' }}>
          <Search placeholder="Search users" onSearch={handleSearch} style={{ padding: '16px' }} />
          <Table
            dataSource={filteredUsers}
            columns={[
              {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
                onCell: (record) => ({
                  onClick: () => handleUserClick(record),
                }),
              },
              {
                title: 'Email',
                dataIndex: 'email',
                key: 'email',
              },
              {
                title: 'Last Message',
                dataIndex: 'chats',
                key: 'lastMessage',
                render: (chats) => `${chats[chats.length - 1].sender}: ${chats[chats.length - 1].message}`,
              },
            ]}
            pagination={false}
            rowKey="id"
            style={{ padding: '16px' }}
            size="large"
            bordered
            scroll={{ x: '100%' }}
          />
        </Sider>
        <Content style={{ padding: '24px' }}>
          {selectedUser && (
            <Modal
              visible={showModal}
              onCancel={handleCloseModal}
              footer={[
                <Button key="send" type="primary" onClick={handleSendMessage}>
                  Send
                </Button>,
                <Button key="close" onClick={handleCloseModal}>
                  Close
                </Button>,
              ]}
              width="80%"
              style={{ top: '20px' }}
            >
              <Title level={4}>Chat with {selectedUser.name}</Title>
              <List
                itemLayout="horizontal"
                dataSource={selectedUser.chats}
                renderItem={(item) => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={<Avatar>{item.sender.charAt(0)}</Avatar>}
                      title={<Text>{item.sender}</Text>}
                      description={item.message}
                    />
                  </List.Item>
                )}
              />
              <Input.TextArea
                rows={3}
                placeholder="Type your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </Modal>
          )}
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminDashboard;