const Router = require('express');
const router = new Router();

const cartController = require('../controllers/cartController');
const AuthCheckMiddleware = require('../middleware/AuthCheckMiddleware')

router.post('/', cartController.addCart);
router.post('/addOne',AuthCheckMiddleware, cartController.addItemInCart);
router.post('/IncrementOne',AuthCheckMiddleware, cartController.incrementCartItemQuantity);
router.post('/DecrementOne',AuthCheckMiddleware, cartController.decrementCartItemQuantity);
router.post('/DeleteOne',AuthCheckMiddleware, cartController.deleteCartItem);
router.get('/items/:cartId', cartController.getItemsByCartId);
router.get('/itemsByUserId',AuthCheckMiddleware,cartController.getCartItemsByUserId);
router.delete('/:cartId', cartController.deleteCart);
router.delete('/items/:itemId', cartController.deleteItemFromCart);

module.exports = router;



// Создание корзины (POST /api/cart):
// Метод: POST
// URL: http://localhost:5000/api/cart
// Тело запроса (raw JSON):
// json
// Copy
// {
//   "userId": 1
// }
// Добавление элемента в корзину (POST /api/cart/items):
// Метод: POST
// URL: http://localhost:5000/api/cart/items
// Тело запроса (raw JSON):
// json
// Copy
// {
//   "cartId": 1,
//   "menuItemId": 1,
//   "quantity": 2
// }
// Получение корзины по идентификатору пользователя (GET /api/cart/:userId):
// Метод: GET
// URL: http://localhost:5000/api/cart/1
// Получение элементов корзины по идентификатору корзины (GET /api/cart/items/:cartId):
// Метод: GET
// URL: http://localhost:5000/api/cart/items/1
// Удаление корзины по идентификатору (DELETE /api/cart/:cartId):
// Метод: DELETE
// URL: http://localhost:5000/api/cart/1
// Удаление элемента из корзины по идентификатору (DELETE /api/cart/items/:itemId):
// Метод: DELETE
// URL: http://localhost:5000/api/cart/items/1