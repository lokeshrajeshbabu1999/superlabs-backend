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

module.exports = {
  getProducts,
  getProductBySku,
};
