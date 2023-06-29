const router = require('express').Router();
const cardsController = require('../controllers/cards');
const {
  validationCardId,
  validationCreateCard,
} = require('../middlewares/validation');

router.get('/', cardsController.getCards);
router.post('/', validationCreateCard, cardsController.createCard);
router.delete('/:cardId', validationCardId, cardsController.deleteCard);
router.put('/:cardId/likes', validationCardId, cardsController.likeCard);
router.delete('/:cardId/likes', validationCardId, cardsController.dislikeCard);

module.exports = router;
