import DbConnect from '@/db/DbConnection';// Utility to connect to MongoDB
import ConversationSchama from '@/db/models/conversation.model';
import {User} from '@/db/models/user.model'
import { NextResponse } from 'next/server';

export  async function POST(req: Request, res:Response) {
  await DbConnect();

  if (req.method === 'POST') {
    const { userChat, AiChat, email } = await req.json();
      
    if (!userChat || !AiChat || !email) {
      return NextResponse.json({ message: 'Missing required fields.' });
    }
      const user = await User.findOne({ email });
         if (!user) {
           return NextResponse.json({ message: 'User not found' });
      }


    try {
      const newConversation = await ConversationSchama.create({
        userChat,
        AiChat,
        userId:user._id
      });

    // Populate the userId to confirm the link
    console.log(await newConversation.populate('userId'));

    await user.conversation.push(newConversation._id);
    // Save the updated user document
    await user.save();


      return NextResponse.json({ message: 'Message saved successfully!', data: newConversation });
    } catch (error) {
      console.error('Error saving message:', error);
      return NextResponse.json({ message: 'Failed to save message.' });
    }
  } else {
    return NextResponse.json({ message: 'Method not allowed.' });
  }
}
