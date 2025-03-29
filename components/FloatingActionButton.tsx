"use client"

import { useState } from 'react'
import { Plus, X, MessageSquare, Image, Music, Code } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export function FloatingActionButton() {
  const [isOpen, setIsOpen] = useState(false)

  const actions = [
    { name: 'New Conversation', icon: MessageSquare },
    { name: 'Generate Image', icon: Image },
    { name: 'Create Audio', icon: Music },
    { name: 'Write Code', icon: Code },
  ]

  return (
    <div className="fixed bottom-6 right-8">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="mb-4 space-y-2"
          >
            {actions.map((action, index) => (
              <motion.button
                key={action.name}
                className="flex items-center justify-start w-full px-4 rounded-md bg-violet-600 text-white hover:bg-violet-700 transition-colors"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <action.icon className="mr-2 h-4 w-4" />
                {action.name}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      <motion.button
        className="rounded-full p-4 bg-violet-600 text-white hover:bg-violet-700 transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Plus className="h-6 w-6" />}
      </motion.button>
    </div>
  )
}

