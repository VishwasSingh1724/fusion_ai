'use client';

import { useUser } from '@clerk/nextjs';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { motion } from 'framer-motion';
import { MessageSquare, Loader2, Calendar } from 'lucide-react';

interface ConversationAsset {
  _id: string;
  userChat: string;
  AiChat: string;
  createdAt: string;
  uploadedAt:string;
}

const ConversationPage = () => {
  const { user } = useUser();
  const [conversations, setConversations] = useState<ConversationAsset[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const response = await axios.post('/api/user-data', {
          email: user?.primaryEmailAddress?.emailAddress,
        });
        const data = response.data.conversation;
        setConversations(data);
      } catch (error) {
        console.error('Error fetching user assets:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user?.primaryEmailAddress?.emailAddress) {
      fetchAssets();
    }
  }, [user?.primaryEmailAddress?.emailAddress]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white"> {/* Light background */}
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (conversations.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <MessageSquare className="w-16 h-16 text-gray-400" />
        <h2 className="mt-4 text-xl font-semibold text-gray-700">No conversations yet</h2>
        <p className="mt-2 text-gray-500">Start a new conversation to see it here</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 py-16">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Conversation History</h1>
          <p className="text-lg text-gray-600">Your past interactions and responses</p>
        </header>

        <div className="max-w-4xl mx-auto space-y-8">
          {conversations.map((conversation, index) => (
            <motion.div
              key={conversation._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-sm text-gray-500 flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    {new Date(conversation?.uploadedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric"
                    })}
                  </span>
                </div>

                <div className="space-y-6">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h2 className="text-sm font-semibold text-gray-600 mb-2">You</h2>
                    <p className="text-gray-800 whitespace-pre-wrap">{conversation.userChat}</p>
                  </div>

                  <div className="bg-blue-50 rounded-lg p-4">
                    <h2 className="text-sm font-semibold text-gray-600 mb-2">AI Response</h2>
                    <ReactMarkdown 
                      className="prose prose-blue max-w-none text-gray-800"
                      components={{
                        code: ({ node, ...props }) => (
                          <code className="bg-blue-100 text-blue-800 px-1 py-0.5 rounded" {...props} />
                        ),
                      }}
                    >
                      {conversation.AiChat}
                    </ReactMarkdown>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ConversationPage;