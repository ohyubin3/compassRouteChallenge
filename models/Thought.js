const { Schema, model } = require("mongoose");
const reactionSchema = require("./Reaction");

// Schema to create a course model
const reactionSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      max_length: 280,
      mmin_length: 1,
    },
    createdAt: {
      type: Date,
      timestamps: true,
      default: Date.now(),
    },
    username: {
      type: String,
      required: true,
    },
    students: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

const Thought = model("thought", thoughtSchema);

module.exports = Thought;
