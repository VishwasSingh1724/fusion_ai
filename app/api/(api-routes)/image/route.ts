// import { NextResponse } from 'next/server';

// export async function POST(req: Request) {
//   function generateRandomNumber(index:number):number{
//    return Math.floor(Math.random()*1000000) +index;
//   }
  
//   try {
//     const {prompt,selectedSizeOption:aspectRatio,selectedOption:numberOfImages} = await req.json();
//     console.log(aspectRatio , numberOfImages);
//     const arrayOfImages=[]
//     for (let index = 1; index <=numberOfImages; index++) {
//       const random = generateRandomNumber(index);
//       const logo='nologo=true'
//          const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}&${logo}&seed=${index*index}&enhance=${true}&height=${aspectRatio}&width=${aspectRatio}`
//          const url = await fetch(imageUrl)
//         //  console.log(url.url);
         
//        const imagesObject =   {
//             url:url.url
//           }
//         arrayOfImages.push(imagesObject)
//        }
     
//       //  console.log(arrayOfImages);
       
//      return NextResponse.json(arrayOfImages);
//   } catch (error) {
//     console.error('Detailed error:', error);
    
//     let errorMessage = 'An error occurred while processing your request';
//     if (error instanceof Error) {
//       errorMessage += `: ${error.message}`;
//     }
    
//     return NextResponse.json({ error: errorMessage }, { status: 500 });
//   }
// }
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import DbConnect from "@/db/DbConnection";
import { User } from "@/db/models/user.model";




export async function POST(req: Request) {
  await DbConnect(); // Connect to the database

  function generateRandomNumber(index: number): number {
    return Math.floor(Math.random() * 1000000) + index;
  }

  try {
    const { prompt, selectedSizeOption: aspectRatio, selectedOption: numberOfImages, email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "User email is required." }, { status: 400 });
    }

    // Fetch the user from the database
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }

    // Check if the user has enough credits
    if (user.credits < numberOfImages) {
      return NextResponse.json({ error: "Insufficient credits." }, { status: 400 });
    }

    // Deduct credits based on the number of images
    user.credits -= numberOfImages;
    await user.save();

    const arrayOfImages = [];

    for (let index = 1; index <= numberOfImages; index++) {
      const random = generateRandomNumber(index);
      const logo = "nologo=true";
      const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(
        prompt
      )}?${logo}&seed=${index * index}&enhance=${true}&height=${aspectRatio}&width=${aspectRatio}`;
      const url = await fetch(imageUrl);
      const imagesObject = {
        url: url.url,
      };
      arrayOfImages.push(imagesObject);
    }

    // Return the generated images and updated credit balance
    return NextResponse.json({
      images: arrayOfImages,
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
