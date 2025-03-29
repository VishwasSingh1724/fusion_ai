"use client"

import { useUser } from "@clerk/nextjs"
import axios from "axios"
import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Code2, Loader2, Calendar, MessageSquare, Copy, Check } from "lucide-react"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism"

interface CodeAsset {
  _id: string
  prompt: string
  code: string
  createdAt: string
}

const CodePage = () => {
  const { user } = useUser()
  const [codes, setCodes] = useState<CodeAsset[]>([])
  const [loading, setLoading] = useState(true)
  const [copiedId, setCopiedId] = useState<string | null>(null)

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const response = await axios.post("/api/user-data", {
          email: user?.primaryEmailAddress?.emailAddress,
        })
        const data = [...response.data.code].reverse()
        setCodes(data)
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

  const handleCopyCode = (code: string, id: string) => {
    // Remove markdown code block syntax if present
    const cleanCode = code.replace(/^```[\s\S]*?\n/, "").replace(/\n```$/, "")
    navigator.clipboard.writeText(cleanCode)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white"> {/* Light background */}
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
    </div>
    )
  }

  if (codes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <Code2 className="w-16 h-16 text-gray-400" />
        <h2 className="mt-4 text-xl font-semibold text-gray-700">No code snippets found</h2>
        <p className="mt-2 text-gray-500">Your saved code will appear here</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-16">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center">
            <Code2 className="w-8 h-8 mr-2 text-blue-500" />
            Your Code Collection
          </h1>
          <p className="text-lg text-gray-600">Browse and reuse your saved code snippets</p>
        </header>

        <div className="max-w-4xl mx-auto space-y-6">
          {codes.map((codeAsset, index) => (
            <motion.div
              key={codeAsset._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <MessageSquare className="w-5 h-5 text-blue-500" />
                    <h2 className="text-lg font-semibold text-gray-800">Prompt</h2>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="w-4 h-4 mr-1" />
                    {new Date(codeAsset.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric"
                    })}
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <p className="text-gray-700 whitespace-pre-wrap">{codeAsset.prompt}</p>
                </div>

                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-lg font-semibold text-gray-800 flex items-center">
                    <Code2 className="w-5 h-5 mr-2 text-blue-500" />
                    Code
                  </h2>
                  <button
                    onClick={() => handleCopyCode(codeAsset.code, codeAsset._id)}
                    className="flex items-center space-x-1 text-sm text-gray-500 hover:text-blue-500 transition-colors"
                  >
                    {copiedId === codeAsset._id ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>Copy code</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="rounded-lg overflow-hidden">
                  <SyntaxHighlighter
                    language="javascript"
                    style={vscDarkPlus}
                    customStyle={{
                      margin: 0,
                      borderRadius: "0.5rem",
                    }}
                    showLineNumbers
                  >
                    {codeAsset.code.replace(/^```[\s\S]*?\n/, "").replace(/\n```$/, "")}
                  </SyntaxHighlighter>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CodePage