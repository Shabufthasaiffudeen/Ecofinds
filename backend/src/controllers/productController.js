const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.listProducts = async (req, res) => {
  try {
    const { category, search } = req.query;
    const filter = {};

    if (category) filter.category = category;
    if (search) filter.title = { contains: search, mode: 'insensitive' };

    const products = await prisma.product.findMany({
      where: filter,
      orderBy: { createdAt: 'desc' },
    });

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch products', error });
  }
};

exports.productDetails = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const product = await prisma.product.findUnique({ where: { id } });
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch product', error });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const { title, description, category, price, image } = req.body;
    const ownerId = req.user.id;

    const product = await prisma.product.create({
      data: { title, description, category, price: parseFloat(price), image, ownerId },
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create product', error });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const ownerId = req.user.id;
    const product = await prisma.product.findUnique({ where: { id } });

    if (!product) return res.status(404).json({ message: 'Product not found' });
    if (product.ownerId !== ownerId) return res.status(403).json({ message: 'Unauthorized' });

    const { title, description, category, price, image } = req.body;

    const updated = await prisma.product.update({
      where: { id },
      data: { title, description, category, price: parseFloat(price), image },
    });

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update product', error });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const ownerId = req.user.id;
    const product = await prisma.product.findUnique({ where: { id } });

    if (!product) return res.status(404).json({ message: 'Product not found' });
    if (product.ownerId !== ownerId) return res.status(403).json({ message: 'Unauthorized' });

    await prisma.product.delete({ where: { id } });
    res.json({ message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete product', error });
  }
};
