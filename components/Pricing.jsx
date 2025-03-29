'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

export default function PricingComponent() {
  const [isAnnual, setIsAnnual] = useState(false)

  const plans = [
    {
      name: 'Basic',
      monthlyPrice: 0,
      annualPrice: 99,
      features: [ 'Limited Generations', 'Limited storage', 'Basic support'],
    },
    {
      name: 'Pro',
      monthlyPrice: 19,
      annualPrice: 199,
      features: ['Increased Generations', 'Icreased storage', 'Priority support'],
    },
    {
      name: 'Enterprise',
      monthlyPrice: 49,
      annualPrice: 499,
      features: ['Unlimited Generations', 'Unlimited Storage', '24/7 support'],
    },
  ]

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b dark:bg-gradient-to-r from-[#000000] via-[#434343] to-[#000000] pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <motion.h2 
            className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Simple, transparent pricing
          </motion.h2>
          <motion.p 
            className="mt-4 text-xl text-gray-600 dark:text-gray-300"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Choose the plan that's right for you
          </motion.p>
        </div>

        <motion.div 
          className="mt-12 flex justify-center items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <span className="text-gray-700 dark:text-gray-300 mr-3">Monthly</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={isAnnual}
              onChange={() => setIsAnnual(!isAnnual)}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          </label>
          <span className="text-gray-700 dark:text-gray-300 ml-3">Annual</span>
        </motion.div>

        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden flex flex-col"
              variants={fadeInUp}
              initial="initial"
              animate="animate"
              transition={{ delay: index * 0.1 }}
            >
              <div className="px-6 py-8">
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">{plan.name}</h3>
                <div className="mt-4 flex items-baseline">
                  <span className="text-5xl font-extrabold text-gray-900 dark:text-white">
                    ₹{isAnnual ? plan.annualPrice : plan.monthlyPrice}
                  </span>
                  <span className="ml-1 text-xl font-semibold text-gray-500 dark:text-gray-400">
                    /{isAnnual ? 'year' : 'month'}
                  </span>
                </div>
                <p className="mt-5 text-lg text-gray-500 dark:text-gray-400">
                  {isAnnual ? 'Billed annually' : 'Billed monthly'}
                </p>
              </div>
              <div className="border-t border-gray-200 dark:border-gray-700 px-6 py-8 flex-grow">
                <ul className="space-y-4">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <div className="flex-shrink-0">
                        <Check className="h-6 w-6 text-green-500" aria-hidden="true" />
                      </div>
                      <p className="ml-3 text-base text-gray-700 dark:text-gray-300">{feature}</p>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="px-6 pb-8">
                <button
                  className="w-full bg-black hover:bg-gray-700 text-white font-bold py-2 px-4 rounded transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                  Get started
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}