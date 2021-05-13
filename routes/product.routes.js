const router = require('express').Router();
const productController = require('../controllers/product.controller');
const uploadController = require('../controllers/upload.controller');
const multer = require('multer');
const upload = multer();



router.get("/", productController.getAllProducts);
router.post("/", productController.addProduct);
router.get("/:id", productController.productInfo);
router.put("/:id", productController.updateProduct);
router.delete("/:id", productController.deleteProduct);

// upload
router.post('/upload', upload.single('file'), uploadController.uploadProduct);


module.exports = router;