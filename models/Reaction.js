const { Schema, Types } = require("mongoose");
const moment = require("moment");
// Moments

const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    ractionBody: {
      type: String,
      required: true,
      maxlength: 280,
      minlength: 1,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: moment().format("MM-DD-YYYY HH:MM:SS"),
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

// reactionSchema.virtual("createdAt").get(function () {
//   return this.friends.length;
// });

module.exports = reactionSchema;
