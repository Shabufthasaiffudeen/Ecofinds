const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const authenticateToken = require('../middlewares/authMiddleware');

const prisma = new PrismaClient();

// Get user's cart (stored in localStorage on frontend, but we can track purchases)
router.get('/', authenticateToken, async (req, res) => {
  try {
    const purchases = await prisma.purchase.findMany({
      where: { userId: req.user.id },
      include: { products: true },
      orderBy: { createdAt: 'desc' }
    });
    res.json(purchases);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch purchases', error });
  }
});

// Create a purchase (checkout)
router.post('/checkout', authenticateToken, async (req, res) => {
  try {
    const { productIds } = req.body;

    const purchase = await prisma.purchase.create({
      data: {
        userId: req.user.id,
        products: {
          connect: productIds.map(id => ({ id: parseInt(id) }))
        }
      },
      include: { products: true }
    });

    res.status(201).json(purchase);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create purchase', error });
  }
});

module.exports = router;
