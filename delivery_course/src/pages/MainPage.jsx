import React, { useRef, useState, useEffect } from "react";
import {
  Typography,
  Button,
  Input,
  Layout,
  List,
  Menu,
  Modal,
  message,
  Radio,
  Divider,
} from "antd";
import LoginComponent from "../components/LoginComponent";
import Menu_comp from "../components/Menu";
import middleware from "../middleware/middleware";
import Footer_comp from "../components/Footer";
import ShowcaseComp from "../components/ShowcaseComp";
import HeaderComp from "../components/HeaderComp";

//style
import "../style/MainPageStyle.css";
//
const { Header, Content } = Layout;
const { Text } = Typography;

const HomePage = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [filterr, setFilterr] = useState("");

  useEffect(() => {
    const fetchPizzaMenu = async () => {
      try {
        const fetchedMenuItems = await middleware.fetchMenuItems();
        setMenuItems(fetchedMenuItems);
      } catch (error) {
        console.error("Error fetching items:", error);
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
  }

  //cart
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [deliveryMethod, setDeliveryMethod] = useState("pickup");

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleDeliveryMethodChange = (e) => {
    setDeliveryMethod(e.target.value);
  };
  //

  const pizzasRef = useRef(null);
  const burgersRef = useRef(null);
  const appetizersRef = useRef(null);
  const dessertsRef = useRef(null);
  const drinksRef = useRef(null);

  const handlePhoneMenuItemClick = () => {
    const phoneNumber = "+7 (123) 456-7890";

    navigator.clipboard
      .writeText(phoneNumber)
      .then(() => {
        message.success("Номер скопирован");
      })
      .catch((error) => {
        message.error("Ошибка при копировании номера");
      });
  };

  const handleMenuClick = (menuItem) => {
    let ref;
    switch (menuItem) {
      case "1":
        ref = pizzasRef;
        break;
      case "2":
        ref = burgersRef;
        break;
      case "3":
        ref = appetizersRef;
        break;
      case "4":
        ref = dessertsRef;
        break;
      case "5":
        ref = drinksRef;
        break;
      case "6":
        setIsCartOpen(true);
        break;
      default:
        ref = null;
        break;
    }
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
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
        console.error("Ошибка при получении элементов корзины:", error);
      }
    }

    fetchCartItems();
  }, []);

  const handleCartClose = () => {
    setIsCartOpen(false);
  };

  const onDeleteItem = async (item) => {
    console.log(item.id);
    try {
      await middleware.deleteCartItem(item.id);
      const items = await middleware.getCartItemsByUserId();
      setCartItems(items);
      message.success("Товар успешно удален из корзины!");
    } catch (error) {
      console.error("Ошибка при удалении элемента из корзины:", error);

      message.success("Ошибка удаления товара из корзины!");
    }
  };

  const CartItem = ({
    item,
    onIncreaseQuantity,
    onDecreaseQuantity,
    menuItems,
  }) => {
    const { menuItemId, quantity, size } = item;

    // Найдите товар по его menuItemId в массиве menuItems
    const menuItem = menuItems?.find((item) => item.id === menuItemId);

    // Если товар найден, получите его название и цену
    let itemName = "Название не найдено";
    let itemPrice = "Цена не найдена";

    if (menuItem) {
      itemName = menuItem.name;
      // В зависимости от размера, выберите соответствующую цену
      switch (size) {
        case "стандартная":
          itemPrice = menuItem.price_normal;
          break;
        case "большая":
          itemPrice = menuItem.price_large;
          break;
        default:
          itemPrice = "Цена не указана";
          break;
      }
    }

    // Добавим отображение размера товара, если тип товара - "Пицца"
    let sizeText = "";
    if (menuItem?.category === "Пицца") {
      sizeText = `(${size})`;
    }

    return (
      <div
        style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}
      >
        <Text>
          {itemName} {sizeText}
        </Text>
        <Text style={{ marginLeft: "10px", marginRight: "10px" }}>
          {itemPrice} руб.
        </Text>
        <Button type="primary" onClick={() => onDecreaseQuantity(item)}>
          -
        </Button>
        <Text style={{ margin: "0 10px" }}>{quantity}</Text>
        <Button type="primary" onClick={() => onIncreaseQuantity(item)}>
          +
        </Button>
        <Button
          type="danger"
          style={{ marginLeft: "10px" }}
          onClick={() => onDeleteItem(item)}
        >
          Удалить
        </Button>
      </div>
    );
  };

  const handleIncreaseQuantity = (item) => {
    middleware.incrementCartItemQuantity(item.id);

    const updatedCartItems = cartItems.map((cartItem) => {
      if (cartItem.id === item.id) {
        return { ...cartItem, quantity: cartItem.quantity + 1 };
      }
      return cartItem;
    });

    setCartItems(updatedCartItems);
  };

  const handleDecreaseQuantity = (item) => {
    middleware.decrementCartItemQuantity(item.id);

    const updatedCartItems = cartItems.map((cartItem) => {
      if (cartItem.id === item.id && cartItem.quantity > 1) {
        return { ...cartItem, quantity: cartItem.quantity - 1 };
      }
      return cartItem;
    });

    setCartItems(updatedCartItems);
  };

  const handleCheckout = async () => {
    const totalPrice = 100; // Рассчитываем общую стоимость заказа
    try {
      const response = await middleware.sendOrderToServer(
        totalPrice,
        paymentMethod,
        deliveryMethod
      );
      console.log("Order sent successfully:", response);

      const items = await middleware.getCartItemsByUserId();
      setCartItems(items);

      if (cartItems.length === 1) {
        console.log(cartItems.length);
        message.success(
          "Заказ успешно сформирован и отобразится у вас в профиле!"
        );
        setIsCartOpen(false);
      } else {
        console.log(cartItems.length);
        message.error("у вас уже есть активный заказ!");
      }
    } catch (error) {
      console.error("Error while sending order:", error);
      message.error("Ошибка при формировании заказа!");
    }
  };

  const handleCartClick = async () => {
    const items = await middleware.getCartItemsByUserId();
    setCartItems(items);
  };

  return (
    <Layout>
      <Header class="main-header">
        <HeaderComp />
        <Menu
          className="custom-menu"
          mode="horizontal"
          defaultSelectedKeys={["1"]}
          onClick={({ key }) => handleMenuClick(key)}
        >
          <Menu.Item key="1">Пицца</Menu.Item>
          <Menu.Item key="2">Бургеры</Menu.Item>
          <Menu.Item key="3">Закуски</Menu.Item>
          <Menu.Item key="4">Дессерты</Menu.Item>
          <Menu.Item key="5">Напитки</Menu.Item>
          <Menu.Item key="7">
            {" "}
            <Input
              placeholder="Название продукта"
              value={filterr}
              onChange={(e) => setFilterr(e.target.value)}
              style={{ width: 200, marginTop: 10 }}
            />
          </Menu.Item>
          <Menu.Item
            key="6"
            style={{ marginLeft: "auto", fontSize: "24px" }}
            onClick={handleCartClick}
          >
            Корзина
          </Menu.Item>
          <Menu.Item
            onClick={handlePhoneMenuItemClick}
            style={{ fontSize: "20px" }}
          >
            +7 (123) 456-7890
          </Menu.Item>
          <LoginComponent isLoggedIn={false} />{" "}
        </Menu>
      </Header>
      <Content class="mainPageContent">
        <ShowcaseComp />
        <div ref={pizzasRef}>
          <Menu_comp
            pizzas={getFilteredMenuItems(filteredMenuItems, "Пицца")}
            menuName={"Пицца"}
          />
        </div>
        <div ref={burgersRef}>
          <Menu_comp
            pizzas={getFilteredMenuItems(filteredMenuItems, "Бургеры")}
            menuName={"Бургеры"}
          />
        </div>
        <div ref={appetizersRef}>
          <Menu_comp
            pizzas={getFilteredMenuItems(filteredMenuItems, "Закуски")}
            menuName={"Закуски"}
          />
        </div>
        <div ref={dessertsRef}>
          <Menu_comp
            pizzas={getFilteredMenuItems(filteredMenuItems, "Десерты")}
            menuName={"Десерты"}
          />
        </div>
        <div ref={drinksRef}>
          <Menu_comp
            pizzas={getFilteredMenuItems(filteredMenuItems, "Напитки")}
            menuName={"Напитки"}
          />
        </div>
        <Footer_comp></Footer_comp>
      </Content>
      <Modal
        title="Корзина"
        visible={isCartOpen}
        onCancel={handleCartClose}
        footer={
          cartItems.length > 0
            ? [
                <Button
                  key="orderButton"
                  type="primary"
                  onClick={handleCheckout}
                >
                  Оформить заказ
                </Button>,
              ]
            : null
        }
      >
        {cartItems.length === 0 ? (
          <div style={{ textAlign: "center", padding: "20px 0" }}>
            <h3>Корзина пуста</h3>
            <p>Добавьте товары, чтобы сделать заказ.</p>
          </div>
        ) : (
          <>
            <List
              dataSource={cartItems}
              renderItem={(item) => (
                <List.Item>
                  <CartItem
                    item={item}
                    onIncreaseQuantity={handleIncreaseQuantity}
                    onDecreaseQuantity={handleDecreaseQuantity}
                    menuItems={menuItems}
                  />
                </List.Item>
              )}
            />
            <Divider />
            <div>
              <h3>Способ оплаты</h3>
              <Radio.Group
                value={paymentMethod}
                onChange={handlePaymentMethodChange}
              >
                <Radio value="card">Картой курьеру</Radio>
                <Radio value="cash">Наличные</Radio>
              </Radio.Group>
            </div>
            <Divider />
            <div>
              <h3>Способ доставки</h3>
              <Radio.Group
                value={deliveryMethod}
                onChange={handleDeliveryMethodChange}
              >
                <Radio value="pickup">Самовывоз</Radio>
                <Radio value="delivery">Доставка</Radio>
              </Radio.Group>
              {deliveryMethod === "pickup" && (
                <div>
                  <Divider />
                  <h3>Адрес: Ул. ленина д.13</h3>
                </div>
              )}
            </div>
          </>
        )}
      </Modal>
    </Layout>
  );
};

export default HomePage;
