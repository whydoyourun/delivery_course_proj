const Router = require('express')
const router = new Router()
const authCheckMiddleware = require('../middleware/AuthCheckMiddleware')


const userController = require('../controllers/userController')

router.post('/registration',userController.registration)
router.post('/login',userController.login)
router.get('/auth',authCheckMiddleware, userController.check)
router.delete('/',)

module.exports = router


//    (req,res)=>{res.json({message: 'ALL WORKING'})}