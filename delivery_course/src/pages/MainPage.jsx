import { Button, Input, Layout, List, Menu, Modal, message } from 'antd';
import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer_comp from '../components/Footer';
import Menu_comp from '../components/Menu';

const { Header, Content } = Layout;

const HomePage = () => {
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

  const CartItems = () => {
    if (cartItems.length === 0) {
      return <p>Корзина пуста</p>;
    }
  
    return (
      <List
        dataSource={cartItems}
        renderItem={(item) => (
          <List.Item>
            {/* Здесь отобразите информацию о товаре */}
          </List.Item>
        )}
      />
    );
  };


  //cart 

  const products = [
    { id: 1, name: 'Товар 1', price: 10 },
    { id: 2, name: 'Товар 2', price: 20 },
    { id: 3, name: 'Товар 3', price: 30 },
  ];

  const CartItem = ({ item, onIncreaseQuantity, onDecreaseQuantity }) => {
    const { name, price, quantity } = item;
  
    return (
      <div>
        <span>{name}</span>
        <span>{price} руб.</span>
        <button onClick={() => onDecreaseQuantity(item)}>-</button>
        <span>{quantity}</span>
        <button onClick={() => onIncreaseQuantity(item)}>+</button>
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




  //cart end


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
          <Menu.Item style={{ fontSize: '20px' }}>
          <Link to="/profile">Аккаунт</Link>
          </Menu.Item>
        </Menu>
      </Header>
      <Content>
        <div ref={pizzasRef}>
          <Menu_comp pizzas={pizzas} menuName={'Пицца'} />
        </div>
        <div ref={burgersRef}>
          <Menu_comp pizzas={pizzas} menuName={'Бургеры'} />
        </div>
        <div ref={appetizersRef}>
          <Menu_comp pizzas={pizzas} menuName={'Закуски'} />
        </div>
        <div ref={dessertsRef}>
          <Menu_comp pizzas={pizzas} menuName={'Дессерты'} />
        </div>
        <div ref={drinksRef}>
          <Menu_comp pizzas={pizzas} menuName={'Напитки'} />
        </div>
      </Content>
      <Footer_comp></Footer_comp>
      <Modal
        title="Чат садминистратором"
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


const pizzas = [
  {
    name: "Пепперони",
    image: 'https://img.freepik.com/free-photo/thinly-sliced-pepperoni-is-popular-pizza-topping-american-style-pizzerias-isolated-white-background-still-life_639032-229.jpg?t=st=1715517267~exp=1715520867~hmac=9d25351ec4a1bec23df195d7582d1a68525e50fc042e30d7fed45080401901d9&w=740',
    priceLarge: 12.99,
    priceStandard: 9.99,
    description:'пепперони, халапеньо, моцарелла, соус'
  },
  {
    name: "Пепперони",
    image: 'https://img.freepik.com/free-photo/thinly-sliced-pepperoni-is-popular-pizza-topping-american-style-pizzerias-isolated-white-background-still-life_639032-229.jpg?t=st=1715517267~exp=1715520867~hmac=9d25351ec4a1bec23df195d7582d1a68525e50fc042e30d7fed45080401901d9&w=740',
    priceLarge: 12.99,
    priceStandard: 9.99,
    description:'пепперони, халапеньо, моцарелла, соус'
  },
  {
    name: "Пепперони",
    image: 'https://img.freepik.com/free-photo/thinly-sliced-pepperoni-is-popular-pizza-topping-american-style-pizzerias-isolated-white-background-still-life_639032-229.jpg?t=st=1715517267~exp=1715520867~hmac=9d25351ec4a1bec23df195d7582d1a68525e50fc042e30d7fed45080401901d9&w=740',
    priceLarge: 12.99,
    priceStandard: 9.99,
    description:'пепперони, халапеньо, моцарелла, соус'
  },
  {
    name: "Пепперони",
    image: 'https://img.freepik.com/free-photo/thinly-sliced-pepperoni-is-popular-pizza-topping-american-style-pizzerias-isolated-white-background-still-life_639032-229.jpg?t=st=1715517267~exp=1715520867~hmac=9d25351ec4a1bec23df195d7582d1a68525e50fc042e30d7fed45080401901d9&w=740',
    priceLarge: 12.99,
    priceStandard: 9.99,
    description:'пепперони, халапеньо, моцарелла, соус'
  },
  {
    name: "Пепперони",
    image: 'https://img.freepik.com/free-photo/thinly-sliced-pepperoni-is-popular-pizza-topping-american-style-pizzerias-isolated-white-background-still-life_639032-229.jpg?t=st=1715517267~exp=1715520867~hmac=9d25351ec4a1bec23df195d7582d1a68525e50fc042e30d7fed45080401901d9&w=740',
    priceLarge: 12.99,
    priceStandard: 9.99,
    description:'пепперони, халапеньо, моцарелла, соус'
  },
  {
    name: "Пепперони",
    image: 'https://img.freepik.com/free-photo/thinly-sliced-pepperoni-is-popular-pizza-topping-american-style-pizzerias-isolated-white-background-still-life_639032-229.jpg?t=st=1715517267~exp=1715520867~hmac=9d25351ec4a1bec23df195d7582d1a68525e50fc042e30d7fed45080401901d9&w=740',
    priceLarge: 12.99,
    priceStandard: 9.99,
    description:'пепперони, халапеньо, моцарелла, соус'
  },
];