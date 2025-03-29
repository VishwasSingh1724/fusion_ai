// pages/api/save-image.ts
import DbConnect from '@/db/DbConnection';
import TransformedImageSchema from '@/db/models/transformes-image.model';
import {User} from '@/db/models/user.model'

import { NextResponse } from 'next/server';

export  async function POST(req: Request, res: Response) {
 

  const {title, url ,email} =await req.json();

  try {
    // Connect to the database
    await DbConnect();

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: 'User not found' });
    }


    // Save the image to the database
    const TransformedImage = await TransformedImageSchema.create({
      title,
      url,
      userId:user._id
    });

    await user.transformedImages.push(TransformedImage._id);
    await user.save()
   console.log(await TransformedImage.populate('userId'))
   
    return NextResponse.json({ message: 'Transformed Image saved successfully!', image: TransformedImage });
  } catch (error) {
    console.error('Error saving image:', error);
    return NextResponse.json({ message: 'Failed to save Transformed Image.', error });
  }
}
