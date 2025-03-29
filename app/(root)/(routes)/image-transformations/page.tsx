import Header from '@/components/Header';
import { FilePenLine } from 'lucide-react';
import React from 'react';
import { v2 as cloudinary } from 'cloudinary';
import UploadButton from '@/components/UploadButton';
import CldImageWidget from '@/components/CldImageWidget';
import Link from 'next/link';

// Define the Image Type
interface Image {
  asset_id: string;
  public_id: string;
  format: string;
  version: number;
  resource_type: string;
  type: string;
  created_at: string;
  bytes: number;
  width: number;
  height: number;
  asset_folder: string;
  display_name: string;
  url: string;
  secure_url: string;
}

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
});
const ImageTransformations = async () => {
  // Fetch all resources
  const results = await cloudinary.api.resources(
   {
    max_results:50
   }
  );

  // Exclude images from "fusion-ai" folder
  const filteredImages = results.resources.filter(
    (image:any) => !image.public_id.startsWith('fusion-ai/')
  );

  return (
    <div className="pt-16 pl-4 md:pl-64 md:ml-4">
      {/* Header with Upload Button */}
      <div className="flex justify-between items-center">
        <Header
          title="AI Image Gallery"
          description="Let AI Transform assets for you."
          icon={FilePenLine}
          iconColor="purple"
          bgColor="purple"
        />
        <UploadButton />
      </div>

      {/* Masonry Grid */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 mt-4 mr-4">
        {filteredImages.map((image: Image, idx: number) => (
          <Link href={`/resources/${image.asset_id}`} key={idx}>
            <div className="mb-4 break-inside-avoid border rounded-lg shadow-md bg-purple-500/10 hover:shadow-lg overflow-hidden">
              <CldImageWidget image={image} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ImageTransformations