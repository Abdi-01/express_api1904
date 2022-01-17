const router = require('express').Router();
const { productsController } = require('../controllers');

router.get('/', productsController.getData)
router.delete('/:id', productsController.deleteData)

module.exports = router;