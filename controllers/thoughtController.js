const { Thought, User } = require('../models');



const thoughtCount = async () =>
  Thought.aggregate()
    .count('thoughtCount')
    .then((numberOfThoughts) => numberOfThoughts);


module.exports = {

  getThoughts(req, res) {
    Thought.find()
      .then(async (thoughts) => {
        const allThoughts = {
          thoughtCount: await thoughtCount(),
          thoughts
        };
        return res.json(allThoughts);
      })
      .catch((err) => res.status(500).json(err));
  },


  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select('-__v')
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No user found with this ID' })
          : res.json(thought))
      .catch((err) => res.status.json(err))
  },


  makeThought(req, res) {
    Thought.create(req.body)
      .then((thought) => {
        // First find a user and then update it to add a thought
        return User.findOneAndUpdate(
          { username: req.body.username },
          { $addToSet: { thoughts: thought._id } },
          { new: true }
        );
      })
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user found with this ID' })
          : res.json('Thought created!'))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      })
  },

  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { new: true })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought found with this ID' })
          : res.json(thought))
      .catch((err) => res.status(500).json(err));
  },

  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought found with this ID' })
          : res.json(thought))
      .catch((err) => res.status(500).json(err))
  },




  addReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { new: true })
      .then((thought) => res.json(thought))
      .catch((err) => res.status(500).json(err))
  },

  deleteReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { new: true })
      .then((thought) => res.json(thought))
      .catch((err) => res.status(500).json(err))
  }
}