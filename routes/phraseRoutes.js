const express = require ('express');
const router = express.Router();
const phraseController = require('../controllers/phraseController');
const authMiddleware = require('../middlewares/authMiddleware');

router.route('/phrases/')
  .get(authMiddleware, phraseController.getAll)

router.route('/phrases/create')
  .post(authMiddleware, phraseController.create)
  
router.route('/phrases/delete/:id')
  .delete(authMiddleware, phraseController.deletePhrase)
  
router.route('/phrases/:id')
  .get(authMiddleware, phraseController.getById)

module.exports = router;