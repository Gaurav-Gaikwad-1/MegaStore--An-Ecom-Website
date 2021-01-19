const express = require('express');
const { addOrderItems,getOrderItems, updateOrderToPay, getMyOrders } = require('../controllers/orderController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/').post(protect,addOrderItems);
router.route('/myorders').get(protect,getMyOrders);
router.route('/:id').get(protect,getOrderItems);
router.route('/:id/pay').put(protect,updateOrderToPay);



module.exports = router;

//This order of routes gives error "getting-error-cast-to-objectid-failed-for-value-at-path-id-for-model" for route '/myorder'
// router.route('/').post(protect,addOrderItems);
// router.route('/:id').get(protect,getOrderItems);
// router.route('/:id/pay').put(protect,updateOrderToPay);
// router.route('/myorders').get(protect,getMyOrders);

//This is bcoz when you placed (/:id) above the (/myorder), then you input the URL with /.../myorders, Route will consider myorders as an id, and it is not a type of ObjectId
