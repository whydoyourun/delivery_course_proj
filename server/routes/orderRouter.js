const Router = require('express')
const router = new Router()

const orderController = require('../controllers/orderController')

router.post('/',orderController.add)
router.get('/:id',orderController.getOne)
router.delete('/',orderController.delete)

module.exports = router