import DbConnect from "@/db/DbConnection";// Example utility to connect to MongoDB
import {User}from '@/db/models/user.model'
import Image from '@/db/models/image.model'

import { NextResponse } from "next/server";
import MusicModel from "@/db/models/music.models";
import CodeModel from "@/db/models/code.model";
import ConversationModel from "@/db/models/conversation.model";
import TransformedImageModel from "@/db/models/transformes-image.model";

export  async function POST(req:Request) {
    const { email } = await req.json();
    console.log(email);
    
 try {
      await DbConnect();
     
     // Replace 'users' with your actual MongoDB collection
     const user = await User.findOne({ email });
        if (!user) {
          return NextResponse.json({ message: 'User not found' });
        }
        console.log(user);
        
        const images = await Image.find()   
        const music = await MusicModel.find()
        const code = await CodeModel.find()
        const consversations = await ConversationModel.find()
        const transformedImages = await TransformedImageModel.find()

   //   code to get user data 
     const populatedUser = await User.findById(user._id)
     ?.populate('images')
     ?.populate('musics')
     ?.populate('code')
     ?.populate('conversation')
     ?.populate('transformedImages')

 

   //  console.log(populatedUser);
     
     return NextResponse.json(populatedUser);
 } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch user data' }, { status: 500 });
 }
}
