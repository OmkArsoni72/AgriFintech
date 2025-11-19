const express = require('express');
const router = express.Router();
const authRoutes = require('./authRoutes');
const farmerRoutes = require('./farmerRoutes');
const loanRoutes = require('./loanRoutes');
const productRoutes = require('./productRoutes');

// Mount routes
router.use('/auth', authRoutes);
router.use('/farmers', farmerRoutes);
router.use('/loans', loanRoutes);
router.use('/products', productRoutes);

module.exports = router;