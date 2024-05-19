const Router = require('express');
const router = new Router();

const orderController = require('../controllers/orderController');

router.post('/add-order', orderController.addOrder);
router.post('/add-item-in-order', orderController.addItemInOrder);
router.get('/:id', orderController.getOrderById);
router.get('/:orderId/items', orderController.getOrderItemsByOrderId);
router.delete('/:id', orderController.deleteOrder);
router.delete('/item/:id', orderController.deleteOrderItem);

module.exports = router;


//      ток пути везде нормально расставить 
//    POST запрос для создания заказа:
//    URL: http://localhost:5000/add-order
//    Тело запроса (raw, JSON):
//    json

//{
//  "userId": 1,
//  "totalPrice": 50.99,
//  "status": "pending"
//}
//    POST запрос для добавления позиции в заказ:
//    URL: http://localhost:5000/add-item-in-order
//    Тело запроса (raw, JSON):
//    json
//{
//  "orderId": 1,
//  "menuItemId": 2,
//  "quantity": 3
//}
//    GET запрос для получения информации о заказе по идентификатору:
//    URL: http://localhost:5000/1
//    GET запрос для получения всех позиций заказа по идентификатору заказа:
//    URL: http://localhost:5000/1/items
//    DELETE запрос для удаления заказа по идентификатору:
//    URL: http://localhost:5000/1
//    DELETE запрос для удаления позиции из заказа по идентификатору элемента заказа:
//    URL: http://localhost:5000/item/1