const Router = require('express')
const router = new Router()

const menuRouter = require('../controllers/menuItemController')

router.post('/',menuRouter.add)
router.get('/',menuRouter.getSorted)
router.get('/:id',menuRouter.getById)
router.delete('/:id',menuRouter.delete)

module.exports = router