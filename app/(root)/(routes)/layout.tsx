import { ReactNode } from "react";
import Sidebar from "@/components/Sidebar";

import { Metadata } from "next";
import { auth, currentUser } from "@clerk/nextjs/server";
import DbConnect from "@/db/DbConnection";
import {User} from "@/db/models/user.model";

export const metadata: Metadata = {
  title: "Fusion AI",
  description: "A multiple ai supported website",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const { userId } = await auth();
  const user = await currentUser();

  console.log(
    userId!,
    user?.primaryEmailAddress?.emailAddress,
    user?.fullName!,
    user?.imageUrl
  );

  await ensureUserDocument(
    userId!,
    user?.primaryEmailAddress?.emailAddress!,
    user?.fullName!,
    user?.imageUrl!
  );
  return (
    <html lang="en">
      <body className="bg-[#e8f2fc]">
        <Sidebar />
        {children}
      </body>
    </html>
  );
}

async function ensureUserDocument(
  userId: string,
  email: string,
  username: string,
  profileImageUrl: string
) {
  const db = await DbConnect(); // Connect to your database

  // Check if the user already exists in the database
  const existingUser = await User.findOne({ email: email });

  // If no user document exists, create a new one
  if (!existingUser) {
    await User.create({
      clerkId: userId,
      email,  
      profileImageUrl,
      username,
    });
    console.log(`User document created for Clerk ID: ${userId}`);
  }
}
