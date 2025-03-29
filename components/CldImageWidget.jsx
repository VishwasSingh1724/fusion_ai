'use client'
import { CldImage } from 'next-cloudinary';

const CldImageWidget = (props) => {
  return (
    <div>
        <CldImage
       width={props.image.width}
       height={props.image.height}
       src={props.image.public_id}
       underlay={props.image.public_id}
        alt="Description of my image"
/>
    </div>
  )
}

export default CldImageWidget


// 'use client';

// import { useState } from 'react';
// import { CldImage } from 'next-cloudinary';

// const CldImageWidget = ({ image }) => {
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [transformation, setTransformation] = useState('');
//   const [appliedTransformation, setAppliedTransformation] = useState(null);

//   // Handle transformation selection
//   const handleTransformation = (event) => {
//     setTransformation(event.target.value);
//   };

//   // Apply transformation to the selected image
//   const applyTransformation = () => {
//     if (selectedImage === image.public_id) {
//       setAppliedTransformation(transformation); // Store applied transformation
//     } else {
//       toast('Please select this image before applying transformation.');
//     }
//   };

//   // Generate the Cloudinary image URL with transformation
//   const generateTransformedUrl = () => {
//     let transformationStr = '';

//     if (appliedTransformation === 'restore') {
//       transformationStr = 'restore';
//     } else if (appliedTransformation === 'auto_enhance') {
//       transformationStr = 'enhance';
//     } else if (appliedTransformation === 'background_removal') {
//       transformationStr = 'removeBackground';
//     }

//     const url = `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/${transformationStr}/${image.public_id}.${image.format}`;
    
//     // Debugging: log the generated URL
//     console.log('Generated URL:', url);

//     return url;
//   };

//   // Use the original image URL if no transformation is applied
//   const transformedImageUrl = appliedTransformation ? generateTransformedUrl() : image.secure_url;

//   return (
//     <div className="p-4 border rounded-md shadow">
//       {/* Render the Cloudinary Image with transformations only for selected image */}
//       <CldImage
//         width={image.width}
//         height={image.height}
//         src={transformedImageUrl}
//         alt={image.display_name}
//       />

//       {/* Radio Button to select the image */}
//       <div className="flex items-center mt-4">
//         <input
//           type="radio"
//           name="selectedImage"
//           checked={selectedImage === image.public_id}
//           onChange={() => setSelectedImage(image.public_id)}
//           className="mr-2"
//         />
//         <label>Select this image</label>
//       </div>

//       {/* Dropdown for selecting Transformation */}
//       <select
//         className="mt-2 w-full p-2 border rounded-md"
//         value={transformation}
//         onChange={handleTransformation}
//       >
//         <option value="">Select Transformation</option>
//         <option value="restore">Restore</option>
//         <option value="auto_enhance">Enhance</option>
//         <option value="background_removal">Remove Background</option>
//       </select>

//       {/* Apply Transformation Button */}
//       <button
//         onClick={applyTransformation}
//         className="mt-4 w-full px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-500"
//       >
//         Apply Transformation
//       </button>
//     </div>
//   );
// };

// export default CldImageWidget;
