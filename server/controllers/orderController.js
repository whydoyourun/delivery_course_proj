const ApiError = require('../error/ApiError');
const { Order, OrderItem,Cart,CartItem  } = require('../models/models');
const {Sequelize} = require('sequelize');


class OrderController {

  // add заказ
  async addOrder(req, res, next) {
    try {
      const { userId, totalPrice, status } = req.body;
      if(!userId||!totalPrice||!status){
        return next(ApiError.badRequest('Не переданы все параметры для создания заказа'));
      }
      const order = await Order.create({ userId, totalPrice, status });
      return res.json(order);
    } catch (error) {
      next(ApiError.internal('Непредвиденная ошибка сервера: ' + error.message));
    }
  }
  // add позицию в заказ
  async addItemInOrder(req, res, next) {
    try {
      const { orderId, menuItemId, quantity } = req.body;
      if(!orderId||!menuItemId||!quantity){
        return next(ApiError.badRequest('Не переданы все параметры для добавления позиции в заказ'));
      }
      const orderItem = await OrderItem.create({ Order_Id: orderId, menuItemId, quantity });
      return res.json(orderItem);
    } catch (error) {
      next(ApiError.internal('Непредвиденная ошибка сервера: ' + error.message));
    }
  }
  //get заказ по id
  async getOrderById(req, res, next) {
    try {
      const { id } = req.params;
      const order = await Order.findByPk(id);
      if (!order) {
        return next(ApiError.badRequest('Заказ не найден'));
      }
      return res.json(order);
    } catch (error) {
      next(ApiError.internal('Непредвиденная ошибка сервера: ' + error.message));
    }
  }
  // get позиции по id заказа
  async getOrderItemsByOrderId(req, res, next) {
    try {
      const { orderId } = req.params;
      const orderItems = await OrderItem.findAll({ where: { Order_Id: orderId } });
      return res.json(orderItems);
    } catch (error) {
      next(ApiError.internal('Непредвиденная ошибка сервера: ' + error.message));
    }
  }
  //delete заказ
  async deleteOrder(req, res, next) {
    try {
      const { id } = req.params;
      const deletedOrderCount = await Order.destroy({ where: { id } });
      if (!deletedOrderCount) {
        return next(ApiError.badRequest('Заказ не найден'));
      }
      return res.json({ message: 'Заказ успешно удален' });
    } catch (error) {
      next(ApiError.internal('Непредвиденная ошибка сервера: ' + error.message));
    }
  }
  //delete позицию из заказа
  async deleteOrderItem(req, res, next) {
    try {
      const { id } = req.params;
      if (!id) {
        return next(ApiError.badRequest('неверный id / id не найден'));
      }
      const deletedOrderItemCount = await OrderItem.destroy({ where: { id } });
      if (!deletedOrderItemCount) {
        return next(ApiError.badRequest('Элемент заказа не найден'));
      }
      return res.json({ message: 'Элемент заказа успешно удален' });
    } catch (error) {
      next(ApiError.internal('Непредвиденная ошибка сервера: ' + error.message));
    }
  }

  //получить все заказы по id пользователя
  async getAllOrdersByUserId(req, res, next) {
    try {
      const userId = req.user.id; // получаем id пользователя из middleware
      const orders = await Order.findAll({ 
        where: { userId },
        order: [['id', 'DESC']] // сортировка по убыванию даты создания
      });
      return res.json(orders);
    } catch (error) {
      next(ApiError.internal('Непредвиденная ошибка сервера: ' + error.message));
    }
  }

  

  async getInProcessOrderByUserId(req, res, next) {
    try {
      const userId = req.user.id; // получаем id пользователя из middleware
      const orders = await Order.findAll({
        where: {
          userId,
          status: 'Готовится'
        },
        order: [['createdAt', 'DESC']]
      });
      return res.json(orders);
    } catch (error) {
      next(ApiError.internal('Непредвиденная ошибка сервера: ' + error.message));
    }
  }

  async getLastReadyOrder(req, res, next) {
    try {
      const userId = req.user.id;
      const lastOrder = await Order.findOne({
        where: {
          userId,
          status: 'Готовится'
        },
        order: [['id', 'DESC']] // Сортировка по убыванию id
      });
      return res.json(lastOrder);
    } catch (error) {
      next(ApiError.internal('Непредвиденная ошибка сервера: ' + error.message));
    }
  }
  
  async cancelOrder(req, res, next) {
    try {
      const { id } = req.params;
      const order = await Order.findByPk(id);
      if (!order) {
        return next(ApiError.badRequest('Заказ не найден'));
      }

      await order.update({ status: 'Отменен' });

      return res.json({ message: 'Заказ успешно отменен' });
    } catch (error) {
      next(ApiError.internal('Непредвиденная ошибка сервера: ' + error.message));
    }
  }

  //создать ордер на юзере из корзины

  async createOrderFromCart(req, res) {
    const userId = req.user.id;
    const { totalPrice, paymentMethod, shippingMethod } = req.body;
  
    try {

      const userCart = await Cart.findOne({ where: { userId } });
      const cartId = userCart.id;

      console.log(userCart.id);

      // Проверяем, есть ли у пользователя активный заказ
      const activeOrder = await Order.findOne({
        where: {
          userId,
          status: 'Готовится',
        }
      });
  
      if (activeOrder) {
        return res.status(400).json({ error: 'У пользователя уже есть активный заказ' });
      }
      console.log('qwe1');
      // Получаем все товары из корзины пользователя
      const cartItems = await CartItem.findAll({
        where: {
          cartId: cartId // Используем явно полученный cartId
        }
      });
  
      console.log(cartItems);

      // Создаем новый заказ
      const order = await Order.create({
        userId,
        totalPrice,
        status: 'Готовится',
        paymentMethod,
        shippingMethod,
      });
      console.log('qwe2');
      // Перемещаем товары из корзины в новый заказ



        cartItems.map(async (item) => {
          console.log(item);
          await OrderItem.create({
            Order_Id: order.id,
            menuItemId: item.menuItemId,
            quantity: item.quantity,
            size: item.size,
          });
        })

      console.log('qwe3');
      // Очищаем корзину
      await CartItem.destroy({
        where: {
          cartId: cartId
        }
      });
  
      return res.status(201).json(order);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Ошибка при создании заказа' + err });
    }
  }
  

  async getAllOrders(req, res, next) {
    try {
      const orders = await Order.findAll({
        order: [['id', 'DESC']]
      });
      return res.json(orders);
    } catch (error) {
      next(ApiError.internal('Непредвиденная ошибка сервера: ' + error.message));
    }
  }

  async updateOrderStatus(req, res) {
    const { id, newStatus } = req.body;
  
    try {
      const order = await Order.findByPk(id);
  
      if (!order) {
        return res.status(404).json({ error: 'Заказ не найден' });
      }
  
      order.status = newStatus;
      await order.save();
  
      res.json(order);
    } catch (error) {
      console.error('Ошибка при обновлении статуса заказа:', error);
      res.status(500).json({ error: 'Ошибка при обновлении статуса заказа' });
    }
  }
  

}

module.exports = new OrderController();