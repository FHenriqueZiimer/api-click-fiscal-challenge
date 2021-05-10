const express = require ('express');
const router = express.Router();
const phraseController = require('../controllers/phraseController');

router.route('/phrases/')
  .get(phraseController.getAll)

router.route('/phrases/create')
  .post(phraseController.create)
  
router.route('/phrases/delete/:id')
  .delete(phraseController.deletePhrase)
  
router.route('/phrases/:id')
  .get(phraseController.getById)

module.exports = router;