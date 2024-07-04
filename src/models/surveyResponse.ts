import mongoose from "mongoose";

const schema = new mongoose.Schema({
  surveyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Survey",
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  listOfResponses: {
    type: [
      {
        QId: {
          type: Number,
          required: true,
        },
        answer: {
          type: String,
          required: true,
        },
      },
    ],
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

export const Response =
  mongoose.models?.Response || mongoose.model("Response", schema);
