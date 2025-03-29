"use client"

import { useUser } from "@clerk/nextjs"
import axios from "axios"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Camera, Calendar, Loader2, Download } from "lucide-react"

interface TransformedImageAsset {
  _id: string
  title: string
  url: string
  uploadedAt: string  // Changed from createdAt to uploadedAt
}

const TransformedImagesPage = () => {
  const { user } = useUser()
  const [transformedImages, setTransformedImages] = useState<TransformedImageAsset[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const response = await axios.post("/api/user-data", {
          email: user?.primaryEmailAddress?.emailAddress,
        })
        setTransformedImages(response.data.transformedImages)
      } catch (error) {
        console.error("Error fetching transformed images:", error)
      } finally {
        setLoading(false)
      }
    }

    if (user?.primaryEmailAddress?.emailAddress) {
      fetchAssets()
    }
  }, [user?.primaryEmailAddress?.emailAddress])

  const handleDownload = async (url: string, title: string) => {
    try {
      const response = await fetch(url)
      const blob = await response.blob()
      const downloadUrl = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = downloadUrl
      link.download = title
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(downloadUrl)
    } catch (error) {
      console.error("Error downloading image:", error)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white"> {/* Light background */}
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
    </div>
    )
  }

  if (transformedImages.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-white">
        <Camera className="w-16 h-16 text-blue-500 mb-6" />
        <h1 className="text-4xl font-bold mb-4 text-gray-800">Your Gallery Awaits</h1>
        <p className="text-gray-600 text-lg">Transform your first image to start building your collection</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-6xl font-bold text-gray-800 mb-4">
            Your Transformed Images
          </h1>
          <p className="text-gray-600 text-lg">A collection of your creative transformations</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {transformedImages.map((image, index) => (
            <motion.div
              key={image._id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <div className="aspect-w-4 aspect-h-3">
                <img
                  src={image.url || "/placeholder.svg"}
                  alt={image.title}
                  className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-6 flex justify-center gap-4">
                    <a
                      href={image.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-6 py-3 bg-white/90 backdrop-blur-sm text-gray-800 rounded-full font-medium transform transition-all duration-300 hover:bg-white hover:scale-105"
                    >
                      View Full Image
                    </a>
                    <button
                      onClick={() => handleDownload(image.url, image.title)}
                      className="inline-flex items-center px-6 py-3 bg-blue-500/90 backdrop-blur-sm text-white rounded-full font-medium transform transition-all duration-300 hover:bg-blue-500 hover:scale-105"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </button>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="w-4 h-4 mr-2" />
                  {new Date(image.uploadedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default TransformedImagesPage