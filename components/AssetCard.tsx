"use client"

import React,{ useState } from 'react'
import { MessageSquare, ImageIcon, Music, Code, ChevronDown, ChevronUp, Plus,FilePenLine ,EyeIcon, CaseUpper} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

interface AssetCardProps {
  type: 'conversation' | 'image' | 'music' | 'code' | 'Transformation'
  count: number
  recentItems: string[]
  url:string
  assetUrl:string
}

const iconMap = {
  conversation: MessageSquare,
  image: ImageIcon,
  music: Music,
  code: Code,
  Transformation: FilePenLine,
}

export function AssetCard({ type, count, recentItems ,url,assetUrl}: AssetCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const Icon = iconMap[type]
  
  return (
    <motion.div 
      className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm"
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="flex items-center justify-between p-4 pb-2">
        <h3 className="text-sm font-medium capitalize text-gray-900 dark:text-gray-100">{type}</h3>
        <Icon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
      </div>
      <div className="p-4 pt-0">
        <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">{count}</div>
        <p className="text-xs text-gray-500 dark:text-gray-400">Generated assets</p>
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-2 flex items-center text-sm text-violet600 dark:text-violet-400 hover:text-violet-700 dark:hover:text-violet300 transition-colors"
        >
          {isExpanded ? 'Hide' : 'Show'} recent
          {isExpanded ? <ChevronUp className="ml-1 h-4 w-4" /> : <ChevronDown className="ml-1 h-4 w-4" />}
        </button>
        <AnimatePresence>
          {isExpanded && (
            <motion.ul
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-2 space-y-1 text-sm"
            >
              {recentItems.map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-gray-400 dark:text-gray-400"
                >
                  {item}
                </motion.li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
        <Link href={`${url}`}>
        <motion.button
          className="mt-4 flex items-center justify-center w-full py-2 rounded-md bg-violet600 text-white hover:bg-violet-700 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Plus className="mr-2 h-4 w-4" />
           {type=="Transformation"?"Transform Images": "Create New " + (type)}
        </motion.button>
        </Link>
        <Link href={`/dashboard${assetUrl}`}>
        <motion.button
          className="mt-4 flex items-center justify-center w-full py-2 rounded-md bg-violet600 text-white hover:bg-violet-700 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <EyeIcon className="mr-2 h-4 w-4" />
          View All {type}s
        </motion.button>
        </Link>
      </div>
    </motion.div>
  )
}

