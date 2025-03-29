// 'use client'

// import { Upload } from 'lucide-react'
// import {CldUploadButton, CloudinaryUploadWidgetInfo} from 'next-cloudinary'
// import { useState } from 'react';

// const UploadButton = () => {

//     const [resource, setResource] = useState<CloudinaryUploadWidgetInfo | string | undefined>();

//   return (
       
//           <CldUploadButton className="flex items-center px-4 py-2 mr-4 bg-emerald-600 text-white rounded-lg shadow gap-2 hover:bg-emerald-500 focus:outline-none focus:ring-4 focus:ring-emerald-300" signatureEndpoint="/api/sign-cloudinary-params"
//            onSuccess={(result, { widget }) => {
//             console.log(result?.info)
//             setResource(result?.info);
//             console.log(resource)
//               // { public_id, secure_url, etc }
//           }}
//           options={{
//             autoMinimize:true,
            
//           }}>
//            Upload Image
//           <Upload className="h-5 w-5" />
//           </CldUploadButton>

//   )
// }

// export default UploadButton
// 'use client';

// import { Upload } from 'lucide-react';
// import { CldUploadButton } from 'next-cloudinary';
// import { useRouter } from 'next/navigation';


// const UploadButton = () => {
//   const router = useRouter(); // Access the Next.js router

//   return (
//     <CldUploadButton
//       className="flex items-center px-4 py-2 mr-4 bg-purple-500 text-white rounded-lg shadow gap-2 hover:bg-purple-500 focus:outline-none focus:ring-4 focus:ring-purple-500/10"
//       signatureEndpoint="/api/sign-cloudinary-params"
      
//       onSuccess={(result, { widget }) => {
//         router.refresh();
//       }}
//       options={{
//         autoMinimize: true,
//       }}
//     >
//       Upload Image
//       <Upload className="h-5 w-5" />
//     </CldUploadButton>
//   );
// };

// export default UploadButton;


'use client';

import { Upload } from 'lucide-react';
import { CldUploadButton } from 'next-cloudinary';
import { useRouter } from 'next/navigation';

const UploadButton = () => {
  const router = useRouter(); // Access the Next.js router

  return (
    <CldUploadButton
      className="flex items-center px-4 py-2 mr-4 bg-purple-500 text-white rounded-lg shadow gap-2 hover:bg-purple-500 focus:outline-none focus:ring-4 focus:ring-purple-500/10"
      signatureEndpoint="/api/sign-cloudinary-params"
      onSuccess={(result, { widget }) => {
        if (result?.info?.asset_id) {
          router.push(`/resources/${result.info.asset_id}`);
        }
      }}
      options={{
        folder: 'fusion-ai', 
        autoMinimize: true,
      }}
    >
      Transform Image
      <Upload className="h-5 w-5" />
    </CldUploadButton>
  );
};

export default UploadButton;
