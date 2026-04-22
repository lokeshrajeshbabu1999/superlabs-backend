const prisma = require('../utils/prisma');

/**
 * @desc Get all products with search and pagination
 * @route GET /api/products
 */
const getProducts = async (req, res) => {
  try {
    const { q, page = 1, limit = 10, category } = req.query;
    const skip = (page - 1) * limit;

    const where = {};
    if (q) {
      where.OR = [
        { name: { contains: q } },
        { description: { contains: q } },
        { sku: { contains: q } },
      ];
    }
    if (category) {
      where.category = category;
    }

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        skip: parseInt(skip),
        take: parseInt(limit),
        orderBy: { createdAt: 'desc' },
        include: { reviews: true },
      }),
      prisma.product.count({ where }),
    ]);

    res.json({
      products,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

/**
 * @desc Get product by SKU
 * @route GET /api/products/:sku
 */
const getProductBySku = async (req, res) => {
  try {
    const { sku } = req.params;
    const product = await prisma.product.findUnique({
      where: { sku },
      include: { reviews: true },
    });

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

/**
 * @desc Add a review for a product
 * @route POST /api/products/:sku/reviews
 */
const addProductReview = async (req, res) => {
  try {
    const { sku } = req.params;
    const { rating, comment, reviewerName } = req.body;

    if (!rating || !comment || !reviewerName) {
      return res.status(400).json({ message: 'Please provide rating, comment, and reviewer name' });
    }

    const product = await prisma.product.findUnique({
      where: { sku },
    });

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const review = await prisma.review.create({
      data: {
        productId: product.id,
        rating: parseInt(rating),
        comment,
        reviewerName,
      },
    });

    res.status(201).json(review);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  getProducts,
  getProductBySku,
  addProductReview,
};

