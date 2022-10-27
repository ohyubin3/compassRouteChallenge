const { Schema, Types } = require("mongoose");
var mongoose = require("mongoose");
require("mongoose-moment")(mongoose);
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
      created: "Moment",
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
