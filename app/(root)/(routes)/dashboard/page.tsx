
"use client";

import { useEffect, useState } from "react";
import { AssetCard } from "@/components/AssetCard";
import { UserPlan } from "@/components/UserPlan";
import { AIInsight } from "@/components/AiInsight";
import { QuickActions } from "@/components/QuickAction";
import { FloatingActionButton } from "@/components/FloatingActionButton";
import { motion } from "framer-motion";
import { LayoutDashboard } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import axios from "axios";

interface ImageData {
  name: string;
  url: string;
}

interface MusicData {
  title: string;
  url: string;
}

interface TransformedImageData {
  title: string;
  url: string;
}
interface ConversationData {
  userChat: string;
  url: string;
}
interface CodeData {
  prompt: string;
  url: string;
}
interface UserAssets {
  images: ImageData[];
  musics: MusicData[];
  transformedImages: TransformedImageData[];
  conversation: ConversationData[];
  code: CodeData[];
  credits: number; // New field for credits
}

export default function DashboardPage() {
  const { user } = useUser();
  const [userAssets, setUserAssets] = useState<UserAssets | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const response = await axios.post("/api/user-data", {
          email: user?.primaryEmailAddress?.emailAddress,
        });

        const data = response.data;

        setUserAssets({
          images: data.images || [],
          musics: data.musics || [],
          transformedImages: data.transformedImages || [],
          conversation: data.conversation || [],
          code: data.code || [],
          credits: data.credits || 0, // Include credits from the response
        });
      } catch (error) {
        console.error("Error fetching user assets:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAssets();
  }, [user?.primaryEmailAddress?.emailAddress]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!userAssets) {
    return <div>Error loading assets. Please try again later.</div>;
  }

  const HandleRefresh = () => {
    // refresh logic here
    window.location.reload();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex-1 space-y-[26px] p-8 pt-6"
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-x-3">
          <div className="p-2 w-fit rounded-md mt-6 bg-violet-500/10">
            <LayoutDashboard className="w-10 h-10 text-violet-500" />
          </div>
          <div>
            <h2 className="text-3xl font-bold mt-6 tracking-tight text-black dark:text-black">
              Dashboard
            </h2>
            <p className="text-gray-500 dark:text-gray-400">
              Overview of your generated assets
            </p>
          </div>
        </div>
        <motion.button
          onClick={HandleRefresh}
          className="px-4 py-2 rounded-md bg-violet-600 text-white hover:bg-violet-700 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Refresh Assets
        </motion.button>
      </div>

      <UserPlan plan="Pro" creditsUsed={90} totalCredits={userAssets.credits} />

      <AIInsight />
<h1 className="text-3xl ml-2 font-bold font-sans">All Saved Assets</h1>
      {/* Grouped Asset Cards Section */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        {/* Conversation Asset Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <AssetCard
            assetUrl="/conversations"
            type="conversation"
            count={userAssets.conversation.length}
            recentItems={userAssets.conversation
              .slice(-4)
              .reverse()
              .map((conversation) => conversation.userChat)}
            url="/conversation"
          />
        </motion.div>

        {/* Images Asset Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <AssetCard
            assetUrl="/images"
            type="image"
            count={userAssets.images.length}
            recentItems={userAssets.images
              .slice(-4)
              .reverse()
              .map((image) => image.name)}
            url="/image"
          />
        </motion.div>

        {/* Music Asset Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <AssetCard
            assetUrl="/musics"
            type="music"
            count={userAssets.musics.length}
            recentItems={userAssets.musics
              .slice(-4)
              .reverse()
              .map((music) => music.title)}
            url="/audio"
          />
        </motion.div>
        {/* Code Images Asset Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <AssetCard
            assetUrl="/codes"
            type="code"
            count={userAssets.code.length}
            recentItems={userAssets.code
              .slice(-4)
              .reverse()
              .map((code) => code.prompt)}
            url="/code"
          />
        </motion.div>
        {/* Transformed Images Asset Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <AssetCard
            assetUrl="/image-transformations"
            type="Transformation"
            count={userAssets.transformedImages.length}
            recentItems={userAssets.transformedImages
              .slice(-4)
              .reverse()
              .map((transformedImage) => transformedImage.title)}
            url="/image-transformations"
          />
        </motion.div>
      </div>

      <QuickActions />
      <FloatingActionButton />
    </motion.div>
  );
}
