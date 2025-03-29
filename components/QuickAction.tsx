"use client"

import { PlusCircle, MessageSquare, Image, Music, Code } from 'lucide-react'
import { motion } from 'framer-motion'
import Link from 'next/link'

export function QuickActions() {
  const actions = [
    { name: 'New Conversation', icon: MessageSquare ,url:'/conversation'},
    { name: 'Generate Image', icon: Image, url:'/image'},
    { name: 'Create Music', icon: Music,url:'/audio' },
    { name: 'Write Code', icon: Code ,url:'/code'},
  ]

  return (
    <motion.div 
      className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Quick Actions</h3>
      </div>
      <div className="p-4 pt-0 grid grid-cols-2 gap-2">
        {actions.map((action, index) => (
         <Link href={`${action.url}`} className="flex items-center justify-start px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-violet-600 hover:text-white dark:hover:text-white transition-colors">
          <motion.button 
            key={action.name}
            className='flex items-center' 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <action.icon className="mr-2 h-4 w-4" />
            {action.name}
          </motion.button>
         </Link>
        ))}
      </div>
    </motion.div>
  )
}

