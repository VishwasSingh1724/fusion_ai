"use client"

import { useUser } from "@clerk/nextjs"
import axios from "axios"
import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Loader2, Calendar, ImageIcon, Download, Eye } from "lucide-react"

interface ImageAsset {
  _id: string
  name: string
  url: string
  uploadedAt: string  // Changed to uploadedAt
}

const ImagesPage = () => {
  const { user } = useUser()
  const [images, setImages] = useState<ImageAsset[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const response = await axios.post("/api/user-data", {
          email: user?.primaryEmailAddress?.emailAddress,
        })
        setImages(response.data.images)
      } catch (error) {
        console.error("Error fetching user assets:", error)
      } finally {
        setLoading(false)
      }
    }

    if (user?.primaryEmailAddress?.emailAddress) {
      fetchAssets()
    }
  }, [user?.primaryEmailAddress?.emailAddress])

  const handleDownload = async (url: string, name: string) => {
    try {
      const response = await fetch(url)
      const blob = await response.blob()
      const downloadUrl = window.URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = downloadUrl
      link.download = name
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

  if (images.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <ImageIcon className="w-16 h-16 text-gray-400" />
        <h2 className="mt-4 text-xl font-semibold text-gray-700">No images yet</h2>
        <p className="mt-2 text-gray-500">Your uploaded images will appear here</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-16">
        <motion.header 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Your Gallery</h1>
          <p className="text-lg text-gray-600">Discover your creative collection</p>
        </motion.header>

        <div className="columns-1 sm:columns-2 lg:columns-4 gap-4 space-y-4">
          {images.map((image, index) => (
            <motion.div
              key={image._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="break-inside-avoid"
            >
              <div className="bg-white rounded-xl shadow-sm overflow-hidden group hover:shadow-xl transition-all duration-300">
                <div className="relative">
                  <img
                    src={image.url}
                    alt={image.name}
                    className="w-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-80 transition-all duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-4 flex justify-center gap-2 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <a
                        href={image.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-3 py-2 bg-white text-gray-800 rounded-lg font-medium hover:bg-gray-100 transition-colors duration-200"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        View
                      </a>
                      <button
                        onClick={() => handleDownload(image.url, image.name)}
                        className="inline-flex items-center px-3 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors duration-200"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="p-4">
                  <h2 className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-300 truncate">
                    {image.name}
                  </h2>
                  
                  <div className="flex items-center mt-2 text-sm text-gray-500">
                    <Calendar className="w-4 h-4 mr-1" />
                    {new Date(image.uploadedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric"
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ImagesPage