import { Button, Form, Input, Layout, Menu, Modal, message } from 'antd';
import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer_comp from '../components/Footer';
import middleware from '../middleware/middleware';

const { Header, Content } = Layout;


const Profile = () => {
  const [form] = Form.useForm();
  const [user, setUser] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [password, setPassword] = useState('');
  const [name, setName] = useState(user?.name || 'не указано');
  const [email, setEmail] = useState(user?.email || 'не указано');
  const [phone, setPhone] = useState(user?.email || 'не указано');
  const [role, setRole] = useState(user?.role || 'USER');
  const [orderHistory, setOrderHistory] = useState([]);
  const [currentOrder,setCurrentOrder] = useState({});

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userInfo = await middleware.fetchUserInfo();
        const orders = await middleware.getAllOrdersByUserId();
        const currentOrders = await middleware.getAllInProcessByUserId();
        console.log('zxc ' + currentOrders)
        setUser(userInfo);
        setName(userInfo.name || 'не указано');
        setEmail(userInfo.email || 'не указано');
        setPhone(userInfo.phoneNumber || 'не указано');
        setRole(userInfo.role || 'USER');
        setOrderHistory(orders);
        setCurrentOrder(currentOrders);
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };

    fetchUserInfo();
  }, []);

  const handleCancelOrder = async () => {
    try {
      await middleware.cancelOrder(currentOrder.id);
      const currentOrders = await middleware.getAllInProcessByUserId();
      setCurrentOrder(currentOrders);
      const orders = await middleware.getAllOrdersByUserId();
      setOrderHistory(orders);
    } catch (error) {
      message.error(`Ошибка отмены заказа: ${error.message}`);
    }
    message.success('Заказ успешно отменен');
    
  };

  const handleEditProfile = () => {
    setIsModalVisible(true);
  };

  const handleLogout = () => {

    localStorage.clear();
  
    window.location.href = 'http://localhost:3000';
  };

  const handleSaveProfile = () => {
    form.validateFields().then(async (values) => {
      console.log('Received values:', values);
      
      const { name, email, password, phone } = values; // Получение значений из формы
  
      // Обновление состояния компонента
      setName(name);
      setEmail(email);
      setPassword(password);
      setPhone(phone);
  
      // Вызов функции обновления данных пользователя
      await middleware.updateUserData(name, email, password, phone);
      
      setIsModalVisible(false);
      message.success('Изменения сохранены');
    }).catch((errorInfo) => {
      console.log('Validation failed:', errorInfo);
    });
  };
  

  return (
    <Layout>
      <Header>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
          <Menu.Item style={{ fontSize: '20px' }} key="1">
            <Link to="/">На главную</Link>
          </Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: '20px', background: '#fff' }}>
        <div>
          <h1>Личный кабинет</h1>
          <Button onClick={handleEditProfile}>Редактировать профиль</Button>
          <Button onClick={handleLogout}>Выйти</Button>
          {role === 'ADMIN' && (
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
                <Link to="/admin/mail">уведомления</Link>
              </Button>
            </div>
          )}
          <Modal
            title="Редактировать профиль"
            visible={isModalVisible}
            onCancel={() => setIsModalVisible(false)}
            onOk={handleSaveProfile}
          >
            <Form form={form} layout="vertical">
              <Form.Item label="Имя" name="name" initialValue={name} rules={[{ required: true, message: 'Пожалуйста, введите имя!' }]}>
                <Input />
              </Form.Item>
              <Form.Item label="Email" name="email" initialValue={email} rules={[{ type: 'email', required: true, message: 'Пожалуйста, введите корректный email!' }]}>
                <Input />
              </Form.Item>
              <Form.Item label="Пароль" name="password" initialValue={password} rules={[{ required: true, message: 'Пожалуйста, введите пароль!' }]}>
                <Input.Password />
              </Form.Item>
              <Form.Item label="Телефон" name="phone" initialValue={phone} rules={[{ required: true, message: 'Пожалуйста, введите номер телефона!' }]}>
                <Input />
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
              <p>Сумма: {order.totalPrice}</p>
              <p>Статус: {order.status}</p>
            </div>
          ))}
        </div>
        <div style={{ marginTop: '40px', textAlign: 'center' }}>
          <h2>Текущий заказ</h2>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
        {currentOrder ? (
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
) : (
  <div>
    <h3>У вас нет активных заказов.</h3>
  </div>
)}

        </div>
        <Footer_comp></Footer_comp>
      </Content>
    </Layout>
  );
};
export default Profile;