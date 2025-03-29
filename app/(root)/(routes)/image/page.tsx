
// 'use client';
// import Header from '@/components/Header';
// import Loader from '@/components/Loader';
// import { useUser } from '@clerk/nextjs';
// import axios from 'axios';
// import { ChevronDown, Download, ImageIcon, SendHorizonal } from 'lucide-react';
// import React, { useState } from 'react';
// import { toast } from 'react-toastify';


// const Image = () => {
//   const [selectedSizeOption, setSelectedSizeOption] = useState(512);
//   const [selectedOption, setSelectedOption] = useState(1);
//   const [prompt, setPrompt] = useState<string>();
//   const [images, setImages] = useState<string[]>();
//   const [loading, setLoading] = useState(false);



//   const userInfo =  useUser()
  
//   // const handleGenerate = async () => {
//   //   setLoading(true);
//   //   setImages(undefined); // Reset images on new generation
//   //   if (!prompt) {
//   //     toast.error("Prompt is required to generate images.");
//   //     setLoading(false);
//   //     return;
//   //   }
  
//   //   try {
//   //     const response = await axios.post('http://localhost:3000/api/image', {
//   //       prompt,
//   //       selectedOption,
//   //       selectedSizeOption,
//   //       email: userInfo?.user?.primaryEmailAddress?.emailAddress,
//   //     });
  
//   //     // Access the `images` array from the response
//   //     const urls = response.data.images.map((image: { url: string }) => image.url);
//   //     setImages(urls);
//   //     setLoading(false);
//   //   } catch (error) {
//   //     console.error('Error generating images:', error);
//   //     toast.error("Failed to generate images. Please try again.");
//   //     setLoading(false);
//   //   }
//   // };
//   const handleGenerate = async () => {
//     setLoading(true);
//     setImages(undefined); // Reset images on new generation
  
//     if (!prompt) {
//       toast.error("Prompt is required to generate images.");
//       setLoading(false);
//       return;
//     }
  
//     try {
//       const response = await axios.post('http://localhost:3000/api/image', {
//         prompt,
//         selectedOption,
//         selectedSizeOption,
//         email: userInfo?.user?.primaryEmailAddress?.emailAddress,
//       });
  
//       const data = response.data;
  
//       // Handle Insufficient credits error from the response data
//       if (data.error === "Insufficient credits.") {
//         toast.error("You do not have enough credits to generate images.");
//         setLoading(false);
//         return; // Stop further execution if no credits
//       }
  
//       // Handle any other errors from the response
//       if (data.error) {
//         toast.error(data.error || "Failed to generate images.");
//         setLoading(false);
//         return;
//       }
  
//       // Handle success case with images
//       if (data.images && Array.isArray(data.images)) {
//         const urls = data.images.map((image: { url: string }) => image.url);
//         setImages(urls);
//         toast.success("Images generated successfully!"); // Optional success toast
//       } else {
//         toast.error("No images returned. Please try again.");
//       }
  
//       setLoading(false);
//     } catch (error) {
//       console.error('Error generating images:', error);
  
//       // Check if the error response has a message
//       if (axios.isAxiosError(error) && error.response) {
//         const errorData = error.response.data;
//         if (errorData && errorData.error === "Insufficient credits.") {
//           toast.error("You do not have enough credits to generate images.");
//         } else {
//           toast.error("Failed to generate images. Please try again.");
//         }
//       } else {
//         toast.error("Something went wrong. Please try again.");
//       }
  
//       setLoading(false);
//     }
//   };
  
  
//   const downloadImage = async (url: string, filename: string) => {
//     try {
//       const response = await fetch(url);
//       const blob = await response.blob();
//       const link = document.createElement('a');
//       link.href = URL.createObjectURL(blob);
//       link.setAttribute('download', filename);
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//     } catch (error) {
//       console.error('Failed to download image', error);
//     }
//   };
  
//   const saveImage = async (url: string) => {
//     try {  
//      const response = await axios.post('/api/save-image', {
//         url,
//         name: prompt,
//         email: userInfo?.user?.primaryEmailAddress?.emailAddress, // Replace with the correct user ID dynamically
//       });
  
//       if (response.status === 200) {
//         toast.success('Image saved successfully!');
//       } else {
//         toast.error('Failed to save image.');
//       }
//     } catch (error) {
//       console.error('Error saving image:', error);
//       toast.error('Failed to save image.');
//     }
//   };
  

//   function ResolutionSelect() {
//     const options = [
//       { value: 512, label: '512x512' },
//       { value: 724, label: '724x724' },
//       { value: 1024, label: '1024x1024' },
//     ];
//     const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//       setSelectedSizeOption(parseInt(event.target.value));
//     };

//     return (
//       <div className="relative w-28">
//         <select
//           value={selectedSizeOption}
//           onChange={handleChange}
//           className="w-full appearance-none bg-black border text-white font-bold rounded-md py-4 pl-4 leading-tight focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
//         >
//           <option value="" disabled>
//             {selectedOption}
//           </option>
//           {options.map((option) => (
//             <option key={option.value} value={option.value}>
//               {option.label}
//             </option>
//           ))}
//         </select>
//         <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 text-gray-700">
//           <ChevronDown className="h-4 w-4 text-white" />
//         </div>
//       </div>
//     );
//   }

//   function SelectNumberOfImages() {
//     const options = [
//       { value: 1, label: '1' },
//       { value: 2, label: '2' },
//       { value: 3, label: '3' },
//       { value: 4, label: '4' },
//     ];

//     const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//       setSelectedOption(parseInt(event.target.value));
//     };

//     return (
//       <div className="relative w-16">
//         <select
//           value={selectedOption}
//           onChange={handleChange}
//           className="w-full appearance-none bg-black border text-white font-bold rounded-md py-4 pl-4 leading-tight focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
//         >
//           <option value="" disabled>
//             {selectedOption}
//           </option>
//           {options.map((option) => (
//             <option key={option.value} value={option.value}>
//               {option.label}
//             </option>
//           ))}
//         </select>
//         <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 text-gray-700">
//           <ChevronDown className="h-4 w-4 text-white" />
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="pt-16 pl-4 md:pl-64 md:ml-4">
//       <Header
//         title="Image Generation"
//         description="Generates Images by leveraging the power of AI"
//         icon={ImageIcon}
//         iconColor="emerald"
//         bgColor="emerald"
//       />

//       <div className="flex items-center bg-slate-50 lg:w-[60%] w-[90%] rounded-lg shadow-lg flex-wrap pb-4 pt-4 md:p-0 gap-6 justify-between">
//         <input
//           value={prompt}
//           placeholder="A cat sitting on a table... "
//           onChange={(e) => {
//             setPrompt(e.target.value);
//           }}
//            className="p-3 lg:p-4 m-3 bg-slate-100 rounded-md outline-none flex-grow"
//         />
//         <div className="flex items-center gap-2">
//           <SelectNumberOfImages />
//           <ResolutionSelect />
//           <button
//           disabled={loading}
//             onClick={handleGenerate}
//             className="mr-4 bg-emerald-500 text-white text-lg p-2 rounded-md font-bold lg:p-3 shadow-md flex item-center gap-2 content-center m-2"
//           >
//           {loading ? "Generating..." : "Generate"}
//             <SendHorizonal />
//           </button>
//         </div>
//       </div>
//       {images ? (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
//           {images.map((url, index) => (
//             <div key={index} className="flex flex-col justify-center items-center bg-white p-4 rounded-lg shadow-md">
//               <img src={url} alt={`Generated image ${index + 1}`} className="max-w-full h-auto rounded-md" />

//               {/* Download button */}
//               <button
//                 onClick={() => downloadImage(url, `generated-image-${index + 1}.png`)}
//                 className="mt-4 bg-slate-800 text-white text-lg p-2 rounded-md font-bold shadow-md flex gap-1"
//               >
//                 Download <Download />
//               </button>

//               {/* Save button */}
//               <button
//                 onClick={() => saveImage(url)}
//                 className="mt-4 bg-emerald-600 text-white text-lg p-2 rounded-md font-bold shadow-md flex gap-1"
//               >
//                 Save
//               </button>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <div>{loading && <div><Loader /></div>}</div>
//       )}
//     </div>
//   );
// };

// export default Image;



"use client"
import Header from "@/components/Header"
import Loader from "@/components/Loader"
import { useUser } from "@clerk/nextjs"
import axios from "axios"
import { ChevronDown, Download, ImageIcon, SendHorizonal } from "lucide-react"
import type React from "react"
import { useState } from "react"
import { toast } from "react-toastify"

const Image = () => {
  const [selectedSizeOption, setSelectedSizeOption] = useState(512)
  const [selectedOption, setSelectedOption] = useState(1)
  const [prompt, setPrompt] = useState<string>()
  const [images, setImages] = useState<string[]>()
  const [loading, setLoading] = useState(false)

  const userInfo = useUser()

  const handleGenerate = async () => {
    setLoading(true)
    setImages(undefined) // Reset images on new generation

    if (!prompt) {
      toast.error("Prompt is required to generate images.")
      setLoading(false)
      return
    }

    try {
      const response = await axios.post("http://localhost:3000/api/image", {
        prompt,
        selectedOption,
        selectedSizeOption,
        email: userInfo?.user?.primaryEmailAddress?.emailAddress,
      })

      const data = response.data

      // Handle Insufficient credits error from the response data
      if (data.error === "Insufficient credits.") {
        toast.error("You do not have enough credits to generate images.")
        setLoading(false)
        return // Stop further execution if no credits
      }

      // Handle any other errors from the response
      if (data.error) {
        toast.error(data.error || "Failed to generate images.")
        setLoading(false)
        return
      }

      // Handle success case with images
      if (data.images && Array.isArray(data.images)) {
        const urls = data.images.map((image: { url: string }) => image.url)
        setImages(urls)
        toast.success("Images generated successfully!") // Optional success toast
      } else {
        toast.error("No images returned. Please try again.")
      }

      setLoading(false)
    } catch (error) {
      console.error("Error generating images:", error)

      // Check if the error response has a message
      if (axios.isAxiosError(error) && error.response) {
        const errorData = error.response.data
        if (errorData && errorData.error === "Insufficient credits.") {
          toast.error("You do not have enough credits to generate images.")
        } else {
          toast.error("Failed to generate images. Please try again.")
        }
      } else {
        toast.error("Something went wrong. Please try again.")
      }

      setLoading(false)
    }
  }

  const downloadImage = async (url: string, filename: string) => {
    try {
      const response = await fetch(url)
      const blob = await response.blob()
      const link = document.createElement("a")
      link.href = URL.createObjectURL(blob)
      link.setAttribute("download", filename)
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (error) {
      console.error("Failed to download image", error)
    }
  }

  const saveImage = async (url: string) => {
    try {
      const response = await axios.post("/api/save-image", {
        url,
        name: prompt,
        email: userInfo?.user?.primaryEmailAddress?.emailAddress, 
      })

      if (response.status === 200) {
        toast.success("Image saved successfully!")
      } else {
        toast.error("Failed to save image.")
      }
    } catch (error) {
      console.error("Error saving image:", error)
      toast.error("Failed to save image.")
    }
  }

  function ResolutionSelect() {
    const options = [
      { value: 512, label: "512x512" },
      { value: 724, label: "724x724" },
      { value: 1024, label: "1024x1024" },
    ]
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedSizeOption(Number.parseInt(event.target.value))
    }

    return (
      <div className="relative w-28">
        <select
          value={selectedSizeOption}
          onChange={handleChange}
          className="w-full appearance-none bg-black border text-white font-bold rounded-md py-4 pl-4 leading-tight focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
        >
          <option value="" disabled>
            {selectedOption}
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 text-gray-700">
          <ChevronDown className="h-4 w-4 text-white" />
        </div>
      </div>
    )
  }

  function SelectNumberOfImages() {
    const options = [
      { value: 1, label: "1" },
      { value: 2, label: "2" },
      { value: 3, label: "3" },
      { value: 4, label: "4" },
    ]

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedOption(Number.parseInt(event.target.value))
    }

    return (
      <div className="relative w-16">
        <select
          value={selectedOption}
          onChange={handleChange}
          className="w-full appearance-none bg-black border text-white font-bold rounded-md py-4 pl-4 leading-tight focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
        >
          <option value="" disabled>
            {selectedOption}
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 text-gray-700">
          <ChevronDown className="h-4 w-4 text-white" />
        </div>
      </div>
    )
  }

  return (
    <div className="pt-16 pl-4 md:pl-64 md:ml-4">
      <Header
        title="Image Generation"
        description="Generates Images by leveraging the power of AI"
        icon={ImageIcon}
        iconColor="emerald"
        bgColor="emerald"
      />

      <div className="flex items-center bg-slate-50 lg:w-[60%] w-[90%] rounded-lg shadow-lg flex-wrap pb-4 pt-4 md:p-0 gap-6 justify-between">
        <input
          value={prompt}
          placeholder="A cat sitting on a table... "
          onChange={(e) => {
            setPrompt(e.target.value)
          }}
          className="p-3 lg:p-4 m-3 bg-slate-100 rounded-md outline-none flex-grow"
        />
        <div className="flex items-center gap-2">
          <SelectNumberOfImages />
          <ResolutionSelect />
          <button
            disabled={loading}
            onClick={handleGenerate}
            className="mr-4 bg-emerald-500 text-white text-lg p-2 rounded-md font-bold lg:p-3 shadow-md flex item-center gap-2 content-center m-2"
          >
            {loading ? "Generating..." : "Generate"}
            <SendHorizonal />
          </button>
        </div>
      </div>
      {images ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
          {images.map((url, index) => (
            <div key={index} className="flex flex-col justify-center items-center bg-white p-4 rounded-lg shadow-md">
              <img
                src={url || "/placeholder.svg"}
                alt={`Generated image ${index + 1}`}
                className="max-w-full h-auto rounded-md"
              />

              <div className="flex w-full mt-4 gap-2">
                <button
                  onClick={() => saveImage(url)}
                  className="flex-grow bg-emerald-600 text-white text-lg py-2 px-4 rounded-md font-bold shadow-md hover:bg-emerald-700 transition-colors duration-200"
                >
                  Save
                </button>
                <button
                  onClick={() => downloadImage(url, `generated-image-${index + 1}.png`)}
                  className="bg-slate-800 text-white p-3 rounded-md font-bold shadow-md hover:bg-slate-700 transition-colors duration-200"
                  title="Download"
                >
                  <Download className="w-6 h-6" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>
          {loading && (
            <div>
              <Loader />
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default Image

