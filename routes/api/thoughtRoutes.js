const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  makeThought,
  updateThought,
  deleteThought,
  addReaction,
  deleteReaction
} = require('../../controllers/thoughtController');

// The many thought routes. Each function is an option of what can do depending on the request type
router.route('/').get(getThoughts).post(makeThought);
router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought);
router.route('/:thoughtId/reactions').post(addReaction);
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

module.exports = router;