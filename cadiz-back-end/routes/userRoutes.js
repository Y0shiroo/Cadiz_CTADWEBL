// routes/userRoutes.js
const express = require('express');
const router = express.Router();

const {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
} = require('../controllers/userController');

// All user-related routes
router.route('/').get(getUsers).post(createUser);
router.route('/:id').put(updateUser).delete(deleteUser);
router.post('/login', loginUser);

module.exports = router;
