"use client"

import { useState, useEffect } from 'react'
import { Lightbulb } from 'lucide-react'
import { motion } from 'framer-motion'

const insights = [
  "Your code generation has improved by 15% this week!",
  "Try using more specific prompts for better image results.",
  "Your most productive time for conversations is between 2-4 PM.",
  "Experiment with different audio styles to enhance variety.",
]

export function AIInsight() {
  const [currentInsight, setCurrentInsight] = useState(insights[0])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentInsight(insights[Math.floor(Math.random() * insights.length)])
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div 
      className="bg-violet-50 dark:bg-violet-900/20 rounded-lg border border-violet-200 dark:border-violet-800 col-span-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center p-4 pb-2">
        <h3 className="text-sm font-medium text-violet-900 dark:text-violet-800">AI Insight</h3>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <Lightbulb className="ml-2 h-4 w-4 text-black" />
        </motion.div>
      </div>
      <div className="p-4 pt-0">
        <motion.p 
          key={currentInsight}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="text-sm text-violet-800 dark:text-black"
        >
          {currentInsight}
        </motion.p>
      </div>
    </motion.div>
  )
}

