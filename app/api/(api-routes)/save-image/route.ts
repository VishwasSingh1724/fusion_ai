// pages/api/save-image.ts
import DbConnect from '@/db/DbConnection';
import Image from '@/db/models/image.model'
import{ User }from '@/db/models/user.model'
import { NextResponse } from 'next/server';

export  async function POST(req: Request) {
  const { url, name, email } = await req.json();

  try {
    // Connect to the database
    await DbConnect();

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: 'User not found' });
    }

    // Save the image to the database
    const newImage = await Image.create({
      name,
      url,
      userId: user._id,
    });

    // Populate the userId to confirm the link
    console.log(await newImage.populate('userId'));

    await user.images.push(newImage._id);
    // Save the updated user document
    await user.save();

    return NextResponse.json({ message: 'Image saved successfully!', image: newImage });
  } catch (error) {
    console.error('Error saving image:', error);
    return NextResponse.json({ message: 'Failed to save image.', error });
  }
}
