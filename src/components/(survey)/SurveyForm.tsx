"use client";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { submitResponse } from "@/actions/survey";
import {useRouter} from "next/navigation";

const data = [
  {
    QId: 1,
    description: "How satisfied are you with our customer service?",
    options: [
      "Very satisfied",
      "Satisfied",
      "Neutral",
      "Dissatisfied",
      "Very dissatisfied",
    ],
  },
  {
    QId: 2,
    description: "Which of our products/services do you use most frequently?",
    options: ["Product A", "Product B", "Product C", "Service X", "Service Y"],
  },
  {
    QId: 3,
    description: "How likely are you to recommend us to a friend or colleague?",
    options: ["Very likely", "Likely", "Neutral", "Unlikely", "Very unlikely"],
  },
  {
    QId: 4,
    description: "What is your primary reason for choosing our company?",
    options: [
      "Price",
      "Quality",
      "Customer service",
      "Brand reputation",
      "Recommendation",
    ],
  },
  {
    QId: 5,
    description: "How satisfied are you with the usability of our website/app?",
    options: [
      "Very satisfied",
      "Satisfied",
      "Neutral",
      "Dissatisfied",
      "Very dissatisfied",
    ],
  },
  {
    QId: 6,
    description: "Which social media platform do you follow us on?",
    options: ["Facebook", "Twitter", "Instagram", "LinkedIn", "Other"],
  },
  {
    QId: 7,
    description: "How often do you use our services?",
    options: ["Daily", "Weekly", "Monthly", "Occasionally", "Never"],
  },
  {
    QId: 8,
    description:
      "What additional features would you like to see in our products?",
    options: [
      "Improved customization options",
      "Better integration with other platforms",
      "Enhanced security features",
      "More payment options",
      "Other",
    ],
  },
  {
    QId: 9,
    description: "Rate your overall satisfaction with our delivery services.",
    options: ["Excellent", "Good", "Average", "Poor", "Very poor"],
  },
  {
    QId: 10,
    description: "How did you hear about our company?",
    options: [
      "Online advertisement",
      "Social media",
      "Word of mouth",
      "Search engine",
      "Other",
    ],
  },
];

const SurveyForm = () => {
  const [responses, setResponses] = useState<{ [key: number]: string }>({});
  const router = useRouter()

  const handleInputChange = (Q_id: number, value: string) => {
    setResponses({ ...responses, [Q_id]: value });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const surveyId = "123"; // Replace with actual survey ID if available
    const data = { surveyId, response: responses };
    
    try {
      const res = await submitResponse(data);
      toast.success("Survey submitted successfully!");
      
      router.push("/")
    } catch (error: any) {
      toast.error(error?.message || "Submission failed");
    }
  };

  return (
    <div>
      <Card className="text-3xl bg-inherit border-none text-center text-white font-bold p-5">
        Survey
      </Card>
      <form onSubmit={handleSubmit}>
        {data.map((question) => (
          <CardContent className="text-white" key={question.QId}>
            <span>{`${question.QId} - `}</span>
            <span>{question.description}</span>
            {question.options.map((option) => (
              <CardContent>
                <label
                  key={option}
                  className="flex items-center gap-5 bg-slate-400 p-1 rounded-md -my-1"
                >
                  <input
                    type="radio"
                    name={`question-${question.QId}`}
                    value={option}
                    onChange={() => handleInputChange(question.QId, option)}
                    checked={responses[question.QId] === option}
                  />
                  {option}
                </label>
              </CardContent>
            ))}
          </CardContent>
        ))}
        <Button
          type="submit"
          variant={"outline"}
          className="w-[90%] ml-7 bg-blue-700 text-white text-xl"
        >
          Submit
        </Button>
      </form>
    </div>
  );
};

export default SurveyForm;
