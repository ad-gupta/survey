"use server";
import { Response } from "@/models/surveyResponse";
import { getUser } from "../auths";
import { connectDB } from "@/lib/db";
interface Answer {
  QId: Number;
  answer: String;
}

export const submitResponse = async (data: {
  surveyId: any;
  response: any;
}) => {
  try {
    const user = await getUser();
    console.log(user)

    if (!user) {
      return new Error(`User not found`);
    }
    const outputArray: Answer[] = Object.keys(data.response).map((key) => {
      const QId = parseInt(key);
      const answer = data.response[key];

      return {
        QId,
        answer,
      };
    });

    console.log(outputArray);

    const dataa = {
      userId: user._id,
      surveyId: user._id,
      listOfResponses: outputArray,
    };
    console.log(dataa);

    await connectDB();
    const survey = await Response.create(dataa);
    console.log(survey);

    return JSON.stringify(survey);
  } catch (error) {
    new Error("Error creating survey");
  }
};
