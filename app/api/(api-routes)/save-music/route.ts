// pages/api/save-image.ts
import DbConnect from '@/db/DbConnection';
import{ User} from '@/db/models/user.model'
import MusicSchema from '@/db/models/music.models';
import { NextResponse } from 'next/server';

export  async function POST(req: Request) {
 

  const {title, url ,email} =await req.json();

  try {
    // Connect to the database
    await DbConnect();

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: 'User not found' });
    }


    // Save the image to the database
    const newMusic = await MusicSchema.create({
      title,
      url,
      userId:user._id
    });

    await user.musics.push(newMusic._id);
    user.save()
   
    return NextResponse.json({ message: 'Music saved successfully!', image: newMusic });
  } catch (error) {
    console.error('Error saving image:', error);
    return NextResponse.json({ message: 'Failed to save music.', error });
  }
}
