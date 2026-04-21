const prisma = require('../utils/prisma');

/**
 * @desc Get all products for admin
 * @route GET /api/admin/products
 */
const getAdminProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: 'desc' },
      include: { reviews: true },
    });
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

/**
 * @desc Create a new product
 * @route POST /api/admin/products
 */
const createProduct = async (req, res) => {
  try {
    const { sku, name, description, price, discountedPrice, stock, category, images, availability } = req.body;

    const existingProduct = await prisma.product.findUnique({ where: { sku } });
    if (existingProduct) {
      return res.status(400).json({ message: 'Product with this SKU already exists' });
    }

    const product = await prisma.product.create({
      data: {
        sku,
        name,
        description,
        price: parseFloat(price),
        discountedPrice: discountedPrice ? parseFloat(discountedPrice) : null,
        stock: parseInt(stock),
        category,
        images: JSON.stringify(images),
        availability: availability === undefined ? true : availability,
      },
    });

    res.status(201).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

/**
 * @desc Update a product
 * @route PUT /api/admin/products/:id
 */
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { sku, name, description, price, discountedPrice, stock, category, images, availability } = req.body;

    const product = await prisma.product.update({
      where: { id: parseInt(id) },
      data: {
        sku,
        name,
        description,
        price: price ? parseFloat(price) : undefined,
        discountedPrice: discountedPrice ? parseFloat(discountedPrice) : undefined,
        stock: stock ? parseInt(stock) : undefined,
        category,
        images: images ? JSON.stringify(images) : undefined,
        availability,
      },
    });

    res.json(product);
  } catch (error) {
    console.error(error);
    if (error.code === 'P2025') {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(500).json({ message: 'Server Error' });
  }
};

/**
 * @desc Delete a product
 * @route DELETE /api/admin/products/:id
 */
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.product.delete({
      where: { id: parseInt(id) },
    });
    res.json({ message: 'Product removed' });
    console.log('Product removed', id);
  } catch (error) {
    console.error(error);
    if (error.code === 'P2025') {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(500).json({ message: 'Server Error' });
  }
};

/**
 * @desc Upload a product image
 * @route POST /api/admin/upload
 */
const uploadProductImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    const imageUrl = `/uploads/${req.file.filename}`;
    res.json({ imageUrl });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  getAdminProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  uploadProductImage,
};
