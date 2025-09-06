const express = require('express');
const router = express.Router();
const authenticateToken = require('../middlewares/authMiddleware');
const productController = require('../controllers/productController');

router.get('/', productController.listProducts);
router.get('/:id', productController.productDetails);
router.post('/', authenticateToken, productController.createProduct);
router.put('/:id', authenticateToken, productController.updateProduct);
router.delete('/:id', authenticateToken, productController.deleteProduct);

module.exports = router;
