import mongoose, { Schema } from "mongoose";

const schema = new Schema({
  Topic: {
    type: String,
    required: true,
  },
  questions: {
    type: [
      {
        QId: {
          type: Number,
          required: true,
        },
        Description: {
          type: String,
          required: true,
        },
        Options: {
          type: [String],
          required: true,
        },
      },
    ],
    required: true,
  },

  surveyUrl: {
    type: String,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
  userID: {
    ref: "user",
    type: Schema.Types.ObjectId,
    required: true,
  },
  PointsAwarded: {
    type: Number,
    default: 0,
  },
});

export const Survey = mongoose.models?.Survey || mongoose.model("Survey", schema);
