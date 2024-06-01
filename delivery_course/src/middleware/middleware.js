
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

  async function addItemToCart(menuItemId, size) {
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
        body: JSON.stringify({ menuItemId, size })
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


  function hasJWT() {
    try {
      const token = localStorage.getItem('jwt');
      console.log(token);
      return token !== null && token !== '';
    } catch (error) {
      console.error('Ошибка при проверке JWT:', error);
      return false;
    }
  }



  async function createOrderFromCart(req, res, next) {
  try {
    // Получаем JWT токен из localStorage
    const jwt = localStorage.getItem('jwt');

    // Формируем тело запроса
    const requestBody = {
      totalPrice: req.totalPrice,
      paymentMethod: req.paymentMethod,
      shippingMethod: req.shippingMethod,
    };

    // Отправляем POST-запрос на сервер
    const response = await fetch('http://localhost:5000/api/order/createFromCart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`,
      },
      body: JSON.stringify(requestBody),
    });

    // Проверяем статус ответа
    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }

    // Получаем данные ответа
    const data = await response.json();

    // Добавляем данные ответа в req объект
    req.orderData = data;

    // Передаем управление следующей функции в цепочке
    next();
  } catch (error) {
    // Обрабатываем ошибку
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Error creating order' });
  }
}

async function sendOrderToServer(totalPrice, paymentMethod, shippingMethod) {
  try {
    // Получаем JWT токен из localStorage
    const jwt = localStorage.getItem('jwt');

    // Формируем тело запроса
    const requestBody = {
      totalPrice,
      paymentMethod,
      shippingMethod,
    };

    // Отправляем POST-запрос на сервер
    const response = await fetch('http://localhost:5000/api/order/createFromCart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`,
      },
      body: JSON.stringify(requestBody),
    });

    // Проверяем статус ответа
    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }

    // Получаем данные ответа
    const data = await response.json();

    // Возвращаем данные ответа
    return data;
  } catch (error) {
    // Обрабатываем ошибку
    console.error('Error sending order:', error);
    throw error;
  }
}

// Метод для увеличения количества товара в корзине
async function incrementCartItemQuantity(menuItemId) {
  const jwt = localStorage.getItem('jwt');

  try {
    const response = await fetch(`http://localhost:5000/api/cart/IncrementOne`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`
      },
      body: JSON.stringify({ menuItemId })
    });

    if (response.ok) {
      const updatedCartItem = await response.json();
      return updatedCartItem;
    } else {
      throw new Error('Ошибка при увеличении количества товара в корзине');
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Метод для уменьшения количества товара в корзине
async function decrementCartItemQuantity(menuItemId) {
  const jwt = localStorage.getItem('jwt');

  try {
    const response = await fetch(`http://localhost:5000/api/cart/DecrementOne`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`
      },
      body: JSON.stringify({ menuItemId })
    });

    if (response.ok) {
      const updatedCartItem = await response.json();
      return updatedCartItem;
    } else {
      throw new Error('Ошибка при уменьшении количества товара в корзине');
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function sendRecoveryCode(userEmail) {
  try {
    const response = await fetch('http://localhost:5000/api/user/sendRecoveryCode', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      // Можно передать любые данные в теле запроса
      body: JSON.stringify({ email: userEmail })
    });

    // Обрабатываем ответ от сервера
    if (response.ok) {
      console.log('Код восстановления отправлен!');
    } else {
      console.error('Ошибка при отправке кода восстановления:', response.status);
    }
  } catch (error) {
    console.error('Произошла ошибка:', error);
  }
}

const verifyRecoveryCode = async (email, recoveryCode) => {
  try {
    const response = await fetch('http://localhost:5000/api/user/verifyRecoveryCode', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, recoveryCode }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }

    const data = await response.json();
    console.log(data); 
    return data;
  } catch (error) {
    console.error('Error verifying recovery code:', error);
    throw error;
  }
};

const updatePassword = async (email, newPassword) => {
  try {
    const response = await fetch('http://localhost:5000/api/user/updatePassword', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, newPassword }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }

    console.log('Password updated successfully');
  } catch (error) {
    console.error('Error updating password:', error.message);
    throw error;
  }
};

const updateUserData = async (name, email, password, phoneNumber) => {
  try {
    // Получение JWT-токена из localStorage
    const jwt = localStorage.getItem('jwt');

    // Отправка POST-запроса на сервер
    const response = await fetch('http://localhost:5000/api/user/updateUserData', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`,
      },
      body: JSON.stringify({ name, email, password, phoneNumber }),
    });

    // Проверка статуса ответа
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }

    // Получение обновленных данных пользователя
    const updatedUser = await response.json();
    return updatedUser;
  } catch (error) {
    console.error('Error updating user data:', error.message);
    throw error;
  }
};

async function fetchAllOrders() {
  try {
    const response = await fetch('http://localhost:5000/api/order/all');

    if (response.ok) {
      const orders = await response.json();
      return orders;
    } else {
      throw new Error('Ошибка при получении заказов');
    }
  } catch (error) {
    console.error('Ошибка при получении заказов:', error);
    throw error;
  }
}

async function updateOrderStatus(id, newStatus) {
  // Получаем JWT из localStorage
  const jwt = localStorage.getItem('jwt');

  // Проверяем наличие JWT
  if (!jwt) {
    console.error('JWT не найден');
    return;
  }

  // Параметры запроса
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${jwt}`
    },
    body: JSON.stringify({ id, newStatus })
  };

  try {
    // Отправляем запрос на сервер
    const response = await fetch('http://localhost:5000/api/order/updateStatus', requestOptions);

    // Проверяем статус ответа
    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`Ошибка: ${response.status} - ${errorMessage}`);
    }

    // Возвращаем данные ответа, если нужно
    return await response.json();
  } catch (error) {
    console.error('Ошибка при отправке запроса:', error.message);
  }
}

  export default {updateOrderStatus,fetchAllOrders,updateUserData,updatePassword,verifyRecoveryCode,sendRecoveryCode,incrementCartItemQuantity,decrementCartItemQuantity,registerUser,loginUser,fetchMenuItems,fetchUserInfo,getAllOrdersByUserId,getAllInProcessByUserId,cancelOrder,addItemToCart,getCartItemsByUserId,hasJWT, sendOrderToServer}