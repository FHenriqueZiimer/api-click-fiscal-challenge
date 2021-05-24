const express = require ('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const authMiddleware = require('../middlewares/authMiddleware');

router.route('/users/')
  .get(authMiddleware, usersController.getAll)

router.route('/users/create')
  .post(usersController.create)

router.route('/users/login')
  .post(usersController.login)
    
router.route('/users/:id')
  .get(authMiddleware, usersController.getById)

module.exports = router;
