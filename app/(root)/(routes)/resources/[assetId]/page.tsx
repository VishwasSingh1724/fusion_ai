import { v2 as cloudinary } from "cloudinary";
import CldWidgets from "@/components/CldWidgets";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
});

async function Resource({ params }: { params: { assetId: string } }) {
  const result = await cloudinary.api.resources_by_asset_ids(params.assetId);
  const resource = result.resources[0]; // Get the first resource
  
  console.log(resource); // Check the resource data

  return (
    <div className="pt-24 pl-4 md:pl-64 md:ml-4">
      <CldWidgets resource={resource} />
    </div>
  );
}

export default Resource;
