
import { NextRequest, NextResponse } from "next/server";

import { GoogleGenerativeAI } from "@google/generative-ai";
import DbConnect from "@/db/DbConnection";
import { User } from "@/db/models/user.model";


export async function POST(req: NextRequest) {
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
      },{status:400});
    }

    // Check if the user has enough credits
    if (user.credits <= 0) {
      return NextResponse.json({
        error: "Insufficient credits.",
      },{status:400});
    }

    // Deduct 1 credit from the user's document
    
    const prompt =
    userPrompt + "you are a code generator. You must answer only in markdown code snippets. Use comments for explanation" 
    
    const result = await model.generateContent(prompt);
    user.credits -= 1;
    await user.save();
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
