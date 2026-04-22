const express = require('express');
const router = express.Router();

const {
    getProducts,
    getProductBySku,
    addProductReview,
} = require('../controllers/productController');


/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Public product listing and search
 */

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get all products with search and pagination
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         description: Search query for name, description, or SKU
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of items per page
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter by category
 *     responses:
 *       200:
 *         description: A list of products with pagination info
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 products:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Product'
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     total: { type: integer }
 *                     page: { type: integer }
 *                     limit: { type: integer }
 *                     totalPages: { type: integer }
 */
router.get('/', getProducts);

/**
 * @swagger
 * /api/products/{sku}:
 *   get:
 *     summary: Get product details by SKU
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: sku
 *         required: true
 *         schema:
 *           type: string
 *         description: The product SKU
 *     responses:
 *       200:
 *         description: Product details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 */
router.get('/:sku', getProductBySku);

/**
 * @swagger
 * /api/products/{sku}/reviews:
 *   post:
 *     summary: Add a review for a product
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: sku
 *         required: true
 *         schema:
 *           type: string
 *         description: The product SKU
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - rating
 *               - comment
 *               - reviewerName
 *             properties:
 *               rating:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 5
 *                 example: 5
 *               comment:
 *                 type: string
 *                 example: "Excellent product, highly recommended!"
 *               reviewerName:
 *                 type: string
 *                 example: "Jane Smith"
 *     responses:
 *       201:
 *         description: Review created successfully
 *       400:
 *         description: Validation error
 *       404:
 *         description: Product not found
 */
router.post('/:sku/reviews', addProductReview);

module.exports = router;
