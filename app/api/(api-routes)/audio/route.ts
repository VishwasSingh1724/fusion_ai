import { NextResponse } from "next/server";
import DbConnect from "@/db/DbConnection";
import { User } from "@/db/models/user.model";


export async function POST(req: Request) {
  await DbConnect(); // Ensure the database is connected

  const { prompt, email } = await req.json(); // Expect email and prompt in the request body
  const MUSICFY_API = process.env.MUSICFY_API_KEY;

  if (!email) {
    return NextResponse.json({ error: "User email is required." }, { status: 400 });
  }

  try {
    // Fetch the user from the database
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }

    // Check if the user has sufficient credits
    if (user.credits < 1) {
      return NextResponse.json({ error: "Insufficient credits." }, { status: 400 });
    }

    // Deduct one credit
    user.credits -= 1;
    await user.save();

    // Call the Musicfy API
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${MUSICFY_API}`,
      },
      body: JSON.stringify({ prompt }),
    };

    const response = await fetch("https://api.musicfy.lol/v1/generate-music", options);

    if (!response.ok) {
      throw new Error(`Musicfy API error: ${response.statusText}`);
    }

    const data = await response.json();

    console.log(data);
    
    // Return the generated music data and updated credit balance
    return NextResponse.json({
      music: data,
      remainingCredits: user.credits,
    });
  } catch (error) {
    console.error("Detailed error:", error);

    let errorMessage = "An error occurred while processing your request";
    if (error instanceof Error) {
      errorMessage += `: ${error.message}`;
    }

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
