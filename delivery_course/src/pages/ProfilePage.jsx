import { Button, Form, Input, Layout, Menu, Modal, message } from 'antd';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Footer_comp from '../components/Footer';

const { Header, Content } = Layout;

// Объекты данных
const user = {
  name: '',
  email: 'ivan@example.com',
  password: '123456',
  phone: '',
  role: 'admin', // Добавим поле роли
};

const orderHistory = [
  {
    id: 1,
    items: ['Товар 1', 'Товар 2', 'Товар 3'],
    total: 100,
    status: 'Доставлен',
  },
  {
    id: 2,
    items: ['Товар 4', 'Товар 5'],
    total: 50,
    status: 'Отменен',
  },
  {
    id: 3,
    items: ['Товар 6'],
    total: 20,
    status: 'Доставлен',
  },
];

const currentOrder = {
  id: 4,
  items: ['Товар 7'],
  total: 30,
  status: 'Готовится',
};

const Profile = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [password, setPassword] = useState(user.password);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);

  const handleCancelOrder = () => {
    // Отменить текущий заказ
    message.success('Заказ отменен');
  };

  const handleEditProfile = () => {
    setIsModalVisible(true);
  };

  const handleSaveProfile = () => {
    // Сохранить изменения профиля
    setIsModalVisible(false);
    message.success('Изменения сохранены');
  };

  return (
    <Layout>
      <Header>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
          <Menu.Item style={{ fontSize: '20px' }} key="1">
            <Link to="/">На главную</Link>
          </Menu.Item>
          <Menu.Item key="6" style={{ marginLeft: 'auto', fontSize: '24px' }}>
            Корзина
          </Menu.Item>
          <Menu.Item style={{ fontSize: '20px' }}>+7 (123) 456-7890</Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: '20px', background: '#fff' }}>
        <div>
          <h1>Личный кабинет</h1>
          <Button onClick={handleEditProfile}>Редактировать профиль</Button>
          <Button onClick={handleEditProfile}>Выйти</Button>
          {user.role === 'admin' && (
            <div>
              <hr />
              <h2>Админ-панель</h2>
              <Button>
                <Link to="/admin/chats">Чаты</Link>
              </Button>
              <Button>
                <Link to="/admin/orders">Заказы</Link>
              </Button>
              <Button>
                <Link to="/admin/menuItems">Товары</Link>
              </Button>
              <Button>
                <Link to="/admin/users">пользователи</Link>
              </Button>
              <Button>
                <Link to="/admin/mail">уведомления</Link>
              </Button>
            </div>
          )}
          <Modal
            title="Редактировать профиль"
            visible={isModalVisible}
            onCancel={() => setIsModalVisible(false)}
            onOk={() => {
              if (name.trim() === '' || phone.trim() === '') {
                // Выводим предупреждение, если обязательные поля не заполнены
                message.warning('Пожалуйста, заполните все обязательные поля');
              } else {
                handleSaveProfile();
              }
            }}
          >
            <Form>
              <Form.Item label="Имя">
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={name.trim() === '' ? 'Введите имя' : ''}
                />
              </Form.Item>
              <Form.Item label="Email">
                <Input value={email} onChange={(e) => setEmail(e.target.value)} />
              </Form.Item>
              <Form.Item label="Пароль">
                <Input.Password
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Item>
              <Form.Item label="Телефон">
                <Input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder={phone.trim() === '' ? 'Введите номер телефона' : ''}
                />
              </Form.Item>
            </Form>
          </Modal>
        </div>
        <div style={{ marginBottom: '20px', textAlign: 'center' }}>
          <h2>Последние заказы</h2>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          {orderHistory.slice(0, 3).map((order) => (
            <div
              key={order.id}
              style={{
                width: '300px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                padding: '16px',
                margin: '0 10px',
              }}
            >
              <h3>Заказ #{order.id}</h3>
              <p>{order.items.join(', ')}</p>
              <p>Сумма: {order.total}</p>
              <p>Статус: {order.status}</p>
            </div>
          ))}
        </div>
        <div style={{ marginTop: '40px', textAlign: 'center' }}>
          <h2>Текущий заказ</h2>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div
            style={{
              width: '300px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              padding: '16px',
              margin: '0 10px',
            }}
          >
            <h3>Заказ #{currentOrder.id}</h3>
            <p>Товары: {currentOrder.items.join(', ')}</p>
            <p>Сумма: {currentOrder.total}</p>
            <p>Статус: {currentOrder.status}</p>
            {currentOrder.status !== 'Доставлен' && (
              <button
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'red',
                  cursor: 'pointer',
                  textDecoration: 'underline',
                  marginTop: '10px',
                }}
                onClick={handleCancelOrder}
              >
                Отменить заказ
              </button>
            )}
          </div>
        </div>
        <Footer_comp></Footer_comp>
      </Content>
    </Layout>
  );
};
export default Profile;