const mongoose = require("mongoose");

const userProgressSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,

      ref: "User",

      required: true,
    },

    company: {
      type: String,

      required: true,
    },

    roadmap: [
      {
        title: String,

        completed: {
          type: Boolean,

          default: false,
        },
      },
    ],

    progress: {
      type: Number,

      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model(
  "UserProgress",

  userProgressSchema,
);
