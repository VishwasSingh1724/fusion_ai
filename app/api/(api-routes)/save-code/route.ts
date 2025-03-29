import DbConnect from '@/db/DbConnection';
import CodeSchema from '@/db/models/code.model';
import {User} from '@/db/models/user.model'
import { NextResponse } from 'next/server';

export  async function POST(req: Request, res: Response) {
  const { code, prompt, email } = await req.json();
   console.log(code, prompt, email );
   
  try {
    // Connect to the database
    await DbConnect();

    // Find the user by email
    const user = await User.findOne({ email });
    
    if (!user) {
      return NextResponse.json({ message: 'User not found' });
    }

    // Save the image to the database
    const newCode = await CodeSchema.create({
      prompt,
      code,
      userId: user._id,
    });

    // Populate the userId to confirm the link
    console.log(await newCode.populate('userId'));

    await user.code.push(newCode._id);
    // Save the updated user document
    await user.save();
    
    console.log(user);
    

    return NextResponse.json({ message: 'Image saved successfully!', image: newCode });
  } catch (error) {
    console.error('Error saving image:', error);
    return NextResponse.json({ message: 'Failed to save image.', error });
  }
}
