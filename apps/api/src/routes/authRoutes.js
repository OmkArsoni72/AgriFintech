const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { protect } = require('../middleware/auth');

// Public routes
router.post('/register', authController.register);
router.post('/login', authController.login);

// Protected routes
router.get('/profile', protect, authController.getProfile);
router.put('/profile', protect, authController.updateProfile);
router.put('/change-password', protect, authController.changePassword);

// Admin routes (for now accessible without auth, add admin middleware later)
router.get('/users', authController.getAllUsers);
router.delete('/users/:id', authController.deleteUser);
router.patch('/users/:id/status', authController.toggleUserStatus);

module.exports = router;
