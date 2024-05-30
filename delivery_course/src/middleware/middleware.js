
//запрос к серверу при регистрации пользователя
async function registerUser(userData) {
  
    try {
      const response = await fetch('http://localhost:5000/api/user/registration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });

      console.log(JSON.stringify(userData))
  
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }

      localStorage.setItem('jwt', data.token);
  
      const data = await response.json();
      console.log('Registered user:', data);
    } catch (error) {
      console.error('Error registering user:', error.message);
      throw error;
    }
  }

async function loginUser(userData) {
  
    try {
      const response = await fetch('http://localhost:5000/api/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });
  
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }
  
      const data = await response.json();


      console.log('*** ' + data.token + ' ***');

      localStorage.setItem('jwt', data.token);


      console.log('Logined user:', data);
    } catch (error) {
      console.error('Error loginning user:', error.message);
      throw error;
    }
  }
  

  async function fetchMenuItems() {
    try {
      const response = await fetch(`http://localhost:5000/api/menu`);
      if (!response.ok) {
        throw new Error(`HTTP Ошибка: ${response.status}`);
      }
      const data = await response.json();

      console.log(data);
      return data;
    } catch (error) {
      console.error('Ошибка при получении позиций меню:', error);
      throw error;
    }
  }

  async function fetchUserInfo() {
    try {
      const jwt = localStorage.getItem('jwt');
  
      if (!jwt) {
        return null;
      }
  
      const headers = new Headers();
      headers.append('Authorization', `Bearer ${jwt}`);
  
      const response = await fetch('http://localhost:5000/api/user/me', {
        headers: headers
      });
  
      if (response.ok) {
        const userData = await response.json();
        return userData;
      } else {
        return null;
      }
    } catch (error) {
      console.error('Ошибка при получении данных пользователя:', error);
      return null;
    }
  }


  async function getAllOrdersByUserId(req, res, next) {
    try {
      const jwt = localStorage.getItem('jwt');
      const response = await fetch('http://localhost:5000/api/order/allById', {
        headers: {
          'Authorization': `Bearer ${jwt}`
        }
      });
  
      if (response.ok) {
        const orders = await response.json();
        return orders;
      } else {
        console.error('Ошибка при получении заказов:', response.status);
        throw new Error(`Ошибка при получении заказов: ${response.status}`);
      }
    } catch (error) {
      console.error('Ошибка при выполнении запроса:', error);
      next(error);
    }
  }

  async function getAllInProcessByUserId(req, res, next) {
    try {
      const jwt = localStorage.getItem('jwt');
      const response = await fetch('http://localhost:5000/api/order/InProcess', {
        headers: {
          'Authorization': `Bearer ${jwt}`
        }
      });
  
      if (response.ok) {
        const orders = await response.json();
        console.log('zxc'+orders);
        return orders;
      } else {
        console.error('Ошибка при получении заказов:', response.status);
        throw new Error(`Ошибка при получении заказов: ${response.status}`);
      }
    } catch (error) {
      console.error('Ошибка при выполнении запроса:', error);
      next(error);
    }
  }

  async function cancelOrder(orderId) {
    try {
      const token = localStorage.getItem('jwt');
  
      const response = await fetch(`http://localhost:5000/api/order/${orderId}/cancel`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }
  
      const data = await response.json();
      return data.message;
    } catch (error) {
      console.error('ошибка отмены заказа:', error);
      throw error;
    }
  }

  async function addItemToCart(menuItemId) {
    try {
      // Get the JWT token from local storage
      const token = localStorage.getItem('jwt');
  
      // Make the POST request
      const response = await fetch('http://localhost:5000/api/cart/addOne', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ menuItemId })
      });
  
      // Check the response status
      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }
  
      // Parse the response body
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('ошибка добавления товара в корзину:', error);
      throw error;
    }
  }

  async function getCartItemsByUserId() {
    try {
      // Получить JWT-токен из localStorage
      const jwtToken = localStorage.getItem('jwt');
  
      // Выполнить GET-запрос к эндпойнту
      const response = await fetch('http://localhost:5000/api/cart/itemsByUserId', {
        headers: {
          'Authorization': `Bearer ${jwtToken}`
        }
      });
  
      // Проверить, что запрос был успешным
      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }
      // Получить данные в формате JSON
      const cartItems = await response.json();
      // Вернуть массив объектов
      return cartItems;
    } catch (error) {
      console.error('Ошибка при получении элементов корзины:', error);
      throw error;
    }
  }



  export default {registerUser,loginUser,fetchMenuItems,fetchUserInfo,getAllOrdersByUserId,getAllInProcessByUserId,cancelOrder,addItemToCart,getCartItemsByUserId}