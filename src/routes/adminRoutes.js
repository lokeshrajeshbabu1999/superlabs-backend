const express = require('express');
const router = express.Router();
const upload = require('../config/multer');
const {
  getAdminProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  uploadProductImage,
} = require('../controllers/adminController');

/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Admin management for products
 */

/**
 * @swagger
 * /api/admin/products:
 *   get:
 *     summary: Get all products for admin
 *     tags: [Admin]
 *     responses:
 *       200:
 *         description: A list of all products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */
router.get('/products', getAdminProducts);

/**
 * @swagger
 * /api/admin/products:
 *   post:
 *     summary: Create a new product
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - sku
 *               - name
 *               - description
 *               - price
 *               - images
 *             properties:
 *               sku: { type: string }
 *               name: { type: string }
 *               description: { type: string }
 *               price: { type: number }
 *               discountedPrice: { type: number }
 *               stock: { type: integer }
 *               category: { type: string }
 *               images: { type: array, items: { type: string } }
 *               availability: { type: boolean }
 *     responses:
 *       201:
 *         description: Product created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Invalid input or SKU already exists
 */
router.post('/products', createProduct);

/**
 * @swagger
 * /api/admin/products/{id}:
 *   put:
 *     summary: Update an existing product
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The product ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sku: { type: string }
 *               name: { type: string }
 *               description: { type: string }
 *               price: { type: number }
 *               discountedPrice: { type: number }
 *               stock: { type: integer }
 *               category: { type: string }
 *               images: { type: array, items: { type: string } }
 *               availability: { type: boolean }
 *     responses:
 *       200:
 *         description: Product updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 */
router.put('/products/:id', updateProduct);

/**
 * @swagger
 * /api/admin/products/{id}:
 *   delete:
 *     summary: Remove a product
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The product ID
 *     responses:
 *       200:
 *         description: Product removed
 *       404:
 *         description: Product not found
 */
/**
 * @swagger
 * /api/admin/upload:
 *   post:
 *     summary: Upload a product image
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Image uploaded
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 imageUrl: { type: string }
 */
router.delete('/products/:id', deleteProduct);
router.post('/upload', upload.single('image'), uploadProductImage);

module.exports = router;
