const { Schema, model } = require("mongoose");
const reactionSchema = require("./Reaction");
const moment = require("moment");

// Schema to create a c model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      max_length: 280,
      mmin_length: 1,
    },
    createdAt: {
      type: Date,
      default: moment().format("MM-DD-YYYY HH:MM:SS"),
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
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
