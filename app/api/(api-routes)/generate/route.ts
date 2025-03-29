// import { GoogleGenerativeAI } from '@google/generative-ai';
// import { NextResponse } from 'next/server';

// export async function POST(req:Request) {
//     const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

//     try {
//         const model = genAI.getGenerativeModel({ model: "gemini-pro" });

//         const body = await req.json()
//         const {message}= body;
        
//         const prompt ="you are a code generator. You must answer only in markdown code snippets. Use comments for explanation" + message;

//         const result = await model.generateContent(prompt);
//         const response = await result.response;
//         const code = await response.text()
//         console.log(code)
//         return NextResponse.json({code: code})
//     } catch (error) {
//         console.error(error)     
//     }
// }

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
    model: "gemini-pro",
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
      " respond in a well descriptive and concise manner containing words between 20 to 30 words";

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
