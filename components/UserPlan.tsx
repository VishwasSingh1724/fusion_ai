"use client"

import { useState } from 'react'
import { Zap } from 'lucide-react'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import Link from 'next/link'

interface UserPlanProps {
  plan: string
  creditsUsed: number
  totalCredits: number
}

export function UserPlan({ plan, creditsUsed, totalCredits }: UserPlanProps) {



  return (
    <motion.div 
      className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 col-span-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className='flex justify-between p-4 items-center'>
      <div className="py-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Your Plan</h3>
      </div>
        <div className="flex justify-between mb-2">
            <p className=" text-lg font-bold text-violet-400">
             Remaining Credits: {totalCredits}
            </p>
        </div>
      </div>
      <div className="p-4 pt-0">
        <button
          className="flex items-center justify-center w-full py-2 px-4 rounded-md bg-violet-600 text-white hover:bg-violet-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
           <Link href='/subscription' className='flex items-center'>
           <>
              <Zap className="mr-2 h-4 w-4" />
              Buy Credits
            </></Link>
        </button>
      </div>
    </motion.div>
  )
}

