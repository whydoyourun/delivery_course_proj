import React, { useRef, useState, useEffect } from 'react';
import {Typography, Button, Input, Layout, List, Menu, Modal, message } from 'antd';
import LoginModule from '../components/LoginModule';
import Menu_comp from '../components/Menu';
import middleware from '../middleware/middleware';
import Footer_comp from '../components/Footer';

const { Header, Content } = Layout;
const { Text } = Typography;

const HomePage = () => {

  //pizzazxc
  const [menuItems, setMenuItems] = useState([]);
  const [filterr, setFilterr] = useState('');

  useEffect(() => {
    const fetchPizzaMenu = async () => {
      try {
        const fetchedMenuItems = await middleware.fetchMenuItems();
        setMenuItems(fetchedMenuItems);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    fetchPizzaMenu();
  }, []);

  const filteredMenuItems = menuItems.filter((item) =>
    item.name.toLowerCase().includes(filterr.toLowerCase())
  );
  //
  function getFilteredMenuItems(items, category) {
    return items.filter((item) => {
      if (category) {
        return item.category === category;
      } else {
        return true;
      }
    });
  };






  const pizzasRef = useRef(null);
  const burgersRef = useRef(null);
  const appetizersRef = useRef(null);
  const dessertsRef = useRef(null);
  const drinksRef = useRef(null);

  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messageInput, setMessageInput] = useState('');
  const [chatMessages, setChatMessages] = useState([
    { id: 1, text: 'Привет! Как мне сделать заказ?', sender: 'user' },
    { id: 2, text: 'Здравствуйте! Вы можете выбрать блюда из нашего меню и добавить их в корзину.', sender: 'admin' },
    { id: 3, text: 'Спасибо за ответ! Я сейчас посмотрю меню.', sender: 'user' },
  ]);

  const [filter, setFilter] = useState(''); // Состояние для хранения значения фильтра

  const handleChatClick = () => {
    setIsChatOpen(!isChatOpen);
  };

  const handlePhoneMenuItemClick = () => {
    const phoneNumber = '+7 (123) 456-7890';

    navigator.clipboard
      .writeText(phoneNumber)
      .then(() => {
        message.success('Номер скопирован');
      })
      .catch((error) => {
        message.error('Ошибка при копировании номера');
      });
  };

  const handleMenuClick = (menuItem) => {
    let ref;
    switch (menuItem) {
      case '1':
        ref = pizzasRef;
        break;
      case '2':
        ref = burgersRef;
        break;
      case '3':
        ref = appetizersRef;
        break;
      case '4':
        ref = dessertsRef;
        break;
      case '5':
        ref = drinksRef;
        break;
      case '6':
        setIsCartOpen(true);
        break;
      default:
        ref = null;
        break;
    }
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleChatModalClose = () => {
    setIsChatOpen(false);
  };

  const handleSendMessage = () => {
    if (messageInput.trim() !== '') {
      const newMessage = {
        id: new Date().getTime(),
        text: messageInput,
        sender: 'user',
      };
      setChatMessages([...chatMessages, newMessage]);
      setMessageInput('');
    }
  };

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    async function fetchCartItems() {
      try {
        const items = await middleware.getCartItemsByUserId();
        setCartItems(items);
      } catch (error) {
        console.error('Ошибка при получении элементов корзины:', error);
      }
    }

    fetchCartItems();
  }, []);

  const handleCartClose = () => {
    setIsCartOpen(false);
  };

  const handleOrder = () => {
    if (cartItems.length === 0) {
      message.info('Корзина пуста');
    } else {
      // Оформление заказа
      // Например, отправка данных на сервер или переход к странице оформления заказа
      console.log('Оформление заказа:', cartItems);
    }
  };



  const CartItem = ({ item, onIncreaseQuantity, onDecreaseQuantity, menuItems }) => {
    const { menuItemId, quantity } = item;
  
    // Найдите товар по его menuItemId в массиве menuItems
    const menuItem = menuItems?.find(item => item.id === menuItemId);
  
    // Если товар найден, получите его название и цену
    const itemName = menuItem ? menuItem.name : "Название не найдено";
    const itemPrice = menuItem ? menuItem.price : "Цена не найдена";
  
    return (
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
        <Text>{itemName}</Text>
        <Text style={{ marginLeft: '10px', marginRight: '10px' }}>{itemPrice} руб.</Text>
        <Button type="primary" onClick={() => onDecreaseQuantity(item)}>-</Button>
        <Text style={{ margin: '0 10px' }}>{quantity}</Text>
        <Button type="primary" onClick={() => onIncreaseQuantity(item)}>+</Button>
      </div>
    );
  };
  

  const handleIncreaseQuantity = (item) => {
    const updatedCartItems = cartItems.map((cartItem) => {
      if (cartItem.id === item.id) {
        return { ...cartItem, quantity: cartItem.quantity + 1 };
      }
      return cartItem;
    });
  
    setCartItems(updatedCartItems);
  };
  
  const handleDecreaseQuantity = (item) => {
    const updatedCartItems = cartItems.map((cartItem) => {
      if (cartItem.id === item.id && cartItem.quantity > 1) {
        return { ...cartItem, quantity: cartItem.quantity - 1 };
      }
      return cartItem;
    });
  
    setCartItems(updatedCartItems);
  };

  return (
    <Layout>
      <Header>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']} onClick={({ key }) => handleMenuClick(key)}>
          <Menu.Item key="1">Пицца</Menu.Item>
          <Menu.Item key="2">Бургеры</Menu.Item>
          <Menu.Item key="3">Закуски</Menu.Item>
          <Menu.Item key="4">Дессерты</Menu.Item>
          <Menu.Item key="5">Напитки</Menu.Item>
          <Menu.Item key="6" style={{ marginLeft: 'auto', fontSize: '24px' }}>Корзина</Menu.Item>
          <Menu.Item onClick={handlePhoneMenuItemClick} style={{ fontSize: '20px' }}>+7 (123) 456-7890</Menu.Item>
          <Menu.Item>
            <Button onClick={handleChatClick}>Чат</Button>
          </Menu.Item>
          <LoginModule isLoggedIn={false} /> {/* Добавление компонента LoginModule */}
        </Menu>
        <Input
          placeholder="Введите название продукта"
          value={filterr}
          onChange={(e) => setFilterr(e.target.value)}
          style={{ width: 200, marginTop: 10, marginLeft: 20 }}
        />
      </Header>
      <Content>
        <div ref={pizzasRef}>
          <Menu_comp pizzas={getFilteredMenuItems(filteredMenuItems,'Пицца')} menuName={'Пицца'} />
        </div>
        <div ref={burgersRef}>
          <Menu_comp pizzas={getFilteredMenuItems(filteredMenuItems,'Бургеры')} menuName={'Бургеры'} />
        </div>
        <div ref={appetizersRef}>
          <Menu_comp pizzas={getFilteredMenuItems(filteredMenuItems,'Закуски')} menuName={'Закуски'} />
        </div>
        <div ref={dessertsRef}>
          <Menu_comp pizzas={getFilteredMenuItems(filteredMenuItems,'Десерты')} menuName={'Десерты'} />
        </div>
        <div ref={drinksRef}>
          <Menu_comp pizzas={getFilteredMenuItems(filteredMenuItems,'Напитки')} menuName={'Напитки'} />
        </div>
        <Footer_comp></Footer_comp>
      </Content>
      <Modal
        title="Чат с администратором"
        visible={isChatOpen}
        onCancel={handleChatModalClose}
        footer={[
          <Input.TextArea
            key="messageInput"
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            autoSize={{ minRows: 2, maxRows: 6 }}
          />,
          <Button key="sendMessage" type="primary" onClick={handleSendMessage}>
            Отправить
          </Button>,
        ]}
      >
        <List
          itemLayout="horizontal"
          dataSource={chatMessages}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                title={item.sender === 'user' ? 'Вы' : 'Администратор'}
                description={item.text}
                style={{ color: item.sender === 'user' ? 'blue' : 'green' }}
              />
            </List.Item>
          )}
        />
      </Modal>
      <Modal
        title="Корзина"
        visible={isCartOpen}
        onCancel={handleCartClose}
        footer={[
          <Button key="orderButton" type="primary" onClick={handleOrder}>
            Оформить заказ
          </Button>,
        ]}
      >
        {cartItems.length === 0 ? (
          <p>Корзина пуста</p>
        ) : (
          <List
            dataSource={cartItems}
            renderItem={(item) => (
              <List.Item>
                <CartItem
                  item={item}
                  onIncreaseQuantity={handleIncreaseQuantity}
                  onDecreaseQuantity={handleDecreaseQuantity}
                />
              </List.Item>
            )}
          />
        )}
      </Modal>
    </Layout>
  );
};

export default HomePage;
