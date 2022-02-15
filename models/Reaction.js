const { Schema, model } = require('mongoose');

const reactionSchema = new Schema(
  {
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
    },
    reactionBody: {
        type: String,
        required: true,
        // minLength: 1,
        maxLength: 280,
    },
    username: {
        type: String,
        required: true,
      },
    createdAt: {
      type: Date,
      default: Date.now(),
      get: (date) => date.toLocaleString('en-US'),
    },
  },
  {
    toJSON: {
        virtuals: true,
        getters: true,
      },
      versionKey: false,
      id: false,
  }
);


module.exports = reactionSchema;
