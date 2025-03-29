import { NextResponse } from "next/server";
import { User } from "@/db/models/user.model";

export async function POST(req: Request) {
  const { clerkId, amount } = await req.json();

  try {
    await User.findOneAndUpdate(
      { clerkId },
      { $inc: { credits: amount } } // Increment credits
    );
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: "Failed to update credits" }, { status: 500 });
  }
}
