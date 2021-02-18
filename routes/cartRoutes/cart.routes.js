const router = require('express').Router()
const {add_to_cart, checkout_get, cart_update, clear_cart} = require('../../controllers/cartController/cart.controoler')


router.get('/add_to_cart/:productId', add_to_cart)
router.get('/checkout', checkout_get)
router.get('/update/:produceId', cart_update)
router.get('/clear_cart', clear_cart)














module.exports = router