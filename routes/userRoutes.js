const express = require ('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

router.route('/users/')
  .get(usersController.getAll)

router.route('/users/create')
  .post(usersController.create)

router.route('/users/login')
  .post(usersController.login)
    
router.route('/users/:id')
  .get(usersController.getById)

module.exports = router;
