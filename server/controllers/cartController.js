const ApiError = require('../error/ApiError');
const { Cart, CartItem } = require('../models/models');

class CartController {
  async addCart(req, res, next) {
    try {
      const { userId } = req.body;
      if(!userId){
        return next(ApiError.badRequest("не указан userId владельца корзины"))
      }
      const cart = await Cart.create({ userId });
      return res.status(201).json(cart);
    } catch (error) {
      next(ApiError.internal('Непредвиденная ошибка сервера: ' + error.message));
    }
  }

  async addItemInCart(req, res, next) {
    try {
      const { cartId, menuItemId, quantity } = req.body;
      if(!cartId||!menuItemId||!quantity){
        return next(ApiError.badRequest("не указаны данные для добавления позиции в корзину"))
      }
      const cartItem = await CartItem.create({ cartId, menuItemId, quantity });
      return res.status(201).json(cartItem);
    } catch (error) {
      next(ApiError.internal('Непредвиденная ошибка сервера: ' + error.message));
    }
  }

  async getCartByUserId(req, res, next) {
    try {
      const { userId } = req.params;
      if(!userId){
        return next(ApiError.badRequest("не указан user id"))
      }
      const cart = await Cart.findOne({ where: { userId } });
      if (!cart) {
        return next(ApiError.notFound('Корзина не найдена'));
      }
      return res.status(200).json(cart);
    } catch (error) {
      next(ApiError.internal('Непредвиденная ошибка сервера: ' + error.message));
    }
  }

  async getItemsByCartId(req, res, next) {
    try {
      const { cartId } = req.params;
      if(!cartId){
        return next(ApiError.badRequest("не указан cart id"))
      }
      const cartItems = await CartItem.findAll({ where: { cartId } });
      return res.status(200).json(cartItems);
    } catch (error) {
      next(ApiError.internal('Непредвиденная ошибка сервера: ' + error.message));
    }
  }

  async deleteCart(req, res, next) {
    try {
      const { cartId } = req.params;
      if(!cartId){
        return next(ApiError.badRequest("не указан cart id"))
      }
      await Cart.destroy({ where: { id: cartId } });
      return res.status(200).json({ message: 'Корзина успешно удалена' });
    } catch (error) {
      next(ApiError.internal('Непредвиденная ошибка сервера: ' + error.message));
    }
  }

  async deleteItemFromCart(req, res, next) {
    try {
      const { itemId } = req.params;
      if(!itemId){
        return next(ApiError.badRequest("не указан item id"))
      }
      await CartItem.destroy({ where: { id: itemId } });
      return res.status(200).json({ message: 'Позиция из корзины успешно удалена' });
    } catch (error) {
      next(ApiError.internal('Непредвиденная ошибка сервера: ' + error.message));
    }
  }
}

module.exports = new CartController();