const Router = require('express')
const router = new Router()

const cartController = require('../controllers/cartController')

router.post('/',cartController.add)
router.get('/:id',cartController.getById)
router.delete('/',cartController.delete)

module.exports = router