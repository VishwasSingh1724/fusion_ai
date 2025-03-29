

import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
 // Adjust the import path based on your project structure
import { GoogleGenerativeAI } from "@google/generative-ai";
import DbConnect from "@/db/DbConnection";
import { User } from "@/db/models/user.model";

// Connect to MongoDB

export async function POST(req: Request) {
  // Connect to the database
  await DbConnect();

  // Get the prompt field from the request body
  const reqBody = await req.json();
  const { userPrompt, email } = reqBody;

  if (!email) {
    return NextResponse.json({
      error: "User email is required.",
    });
  }

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-pro-001",
    generationConfig: { maxOutputTokens: 200 },
  });

  try {
    // Fetch user by email
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({
        error: "User not found.",
      });
    }

    // Check if the user has enough credits
    if (user.credits <= 0) {
      return NextResponse.json({
        error: "Insufficient credits.",
      });
    }

    // Deduct 1 credit from the user's document
    user.credits -= 1;
    await user.save();

    const prompt =
      userPrompt +
      " respond in a well descriptive and detailed manner";

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({
      text,
      remainingCredits: user.credits, // Return remaining credits for confirmation
    });
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json({
      error: "An error occurred while processing your request.",
    });
  }
}
