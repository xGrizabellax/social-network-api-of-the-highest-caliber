const router = require('express').Router();
const {
  // Thought controllers
  getThoughts,
  getSingleThought,
  makeThought,
  updateThought,
  deleteThought,
  addReaction,
  deleteReaction
} = require('../../controllers/thoughtController');

// Routes for thoughts
router.route('/').get(getThoughts).post(makeThought);
router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought);
router.route('/:thoughtId/reactions').post(addReaction);
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

module.exports = router;