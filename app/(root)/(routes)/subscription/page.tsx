'use client'

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Zap, Shield, Users, BarChart4, Headphones } from 'lucide-react';
import axios from 'axios';
import { useUser } from '@clerk/nextjs';


const plans = [
  {
    name: 'Starter',
    price: 9,
    features: [
      { name: 'Team members', value: 'Up to 10', icon: Users },
      { name: 'Storage', value: '50GB', icon: Shield },
      { name: 'API calls', value: '10,000 / month', icon: Zap },
      { name: 'Support', value: 'Email', icon: Headphones },
      { name: 'Analytics', value: 'Basic', icon: BarChart4 },
    ],
  },
  {
    name: 'Professional',
    price: 19,
    features: [
      { name: 'Team members', value: 'Up to 50', icon: Users },
      { name: 'Storage', value: '250GB', icon: Shield },
      { name: 'API calls', value: '100,000 / month', icon: Zap },
      { name: 'Support', value: 'Priority', icon: Headphones },
      { name: 'Analytics', value: 'Advanced', icon: BarChart4 },
    ],
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 99,
    features: [
      { name: 'Team members', value: 'Unlimited', icon: Users },
      { name: 'Storage', value: '1TB', icon: Shield },
      { name: 'API calls', value: 'Unlimited', icon: Zap },
      { name: 'Support', value: '24/7 Dedicated', icon: Headphones },
      { name: 'Analytics', value: 'Custom', icon: BarChart4 },
    ],
  },
];

const SubscriptionPage = () => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [isYearly, setIsYearly] = useState(false);


  const { user } = useUser();
  
  

  const handlePlanSelection = (plan: string) => {
    setSelectedPlan(plan);
  };


  const checkoutPayment = async () => {
    if (!selectedPlan) return; 

    const selectedPlanDetails = plans.find(plan => plan.name === selectedPlan);
    const amount = isYearly
      ? (selectedPlanDetails?.price || 0) * 12 * 0.8 // Apply the 20% discount for yearly
      : selectedPlanDetails?.price || 0;

    try {
      const response = await axios.post('/api/checkout-session', {
        clerkId:user?.id,
        name: selectedPlanDetails?.name,
        price: amount,
      });

      // Redirect user to Stripe checkout
      window.location.href = response.data.url;
    } catch (error) {
      console.error('Error during checkout:', error);
      // Handle error, maybe show an alert
    }
  };

  return (
    <div className="pt-32 pl-4 md:pl-64 md:ml-4 flex items-center bg-white text-gray-900">
      <main className="mx-auto">
        <div className="text-center">
          <motion.h1
            className="text-6xl font-bold mb-4 text-black"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Choose Your Perfect Plan
          </motion.h1>
          <motion.p
            className="text-xl text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Unlock the full potential of our platform with a plan tailored to your needs.
            Scale your success with our cutting-edge features and unparalleled support.
          </motion.p>
        </div>

        <div className="flex justify-center items-center space-x-4 mb-12">
          <span className={`text-lg ${!isYearly ? 'font-semibold text-black' : 'text-gray-500'}`}>Monthly</span>
          <button
            className={`w-16 h-8 flex items-center rounded-full p-1 ${isYearly ? 'bg-black' : 'bg-gray-300'}`}
            onClick={() => setIsYearly(!isYearly)}
          >
            <motion.div
              className="w-6 h-6 bg-white rounded-full shadow-md"
              layout
              transition={{ type: 'spring', stiffness: 700, damping: 30 }}
              style={{ x: isYearly ? 32 : 0 }}
            />
          </button>
          <span className={`text-lg ${isYearly ? 'font-semibold text-black' : 'text-gray-500'}`}>
            Yearly <span className="text-green-600 text-sm font-normal">(Save 20%)</span>
          </span>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              className={`relative rounded-2xl overflow-hidden border-2 border-black ${
                selectedPlan === plan.name ? 'ring-2 ring-black' : ''
              } ${plan.popular ? 'md:-mt-4 md:mb-4' : ''}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              {plan.popular && (
                <div className="absolute top-0 left-0 right-0 bg-black text-white text-center py-2 text-sm font-semibold">
                  Most Popular
                </div>
              )}
              <div className="p-12 bg-transparent">
                <h3 className="text-2xl font-semibold mb-4">{plan.name}</h3>
                <div className="text-4xl font-bold mb-6">
                  ₹{isYearly ? (plan.price * 12 * 0.8).toFixed(0) : plan.price}
                  <span className="text-lg font-normal text-gray-500">/{isYearly ? 'year' : 'month'}</span>
                </div>
                <ul className="mb-8 space-y-4">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-700">
                      <feature.icon className="w-5 h-5 mr-3 text-black" />
                      <span className="font-medium">{feature.name}:</span>
                      <span className="ml-2">{feature.value}</span>
                    </li>
                  ))}
                </ul>
                <motion.button
                  className={`w-full py-3 rounded-lg text-lg font-semibold transition ${
                    selectedPlan === plan.name
                      ? 'bg-black text-white'
                      : 'bg-transparent text-black border-2 border-black hover:bg-black hover:text-white'
                  }`}
                  onClick={() => handlePlanSelection(plan.name)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {selectedPlan === plan.name ? 'Selected' : 'Select Plan'}
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </main>

      <AnimatePresence>
        {selectedPlan && (
          <motion.div
            className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t-2 border-black"
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
              <div>
                <p className="text-lg font-semibold text-black">
                  Selected Plan: <span className="text-gray-700">{selectedPlan}</span>
                </p>
                <p className="text-gray-600">
                  {isYearly
                    ? `₹${(plans.find(p => p.name === selectedPlan)?.price || 0) * 12 * 0.8}/year`
                    : `₹${plans.find(p => p.name === selectedPlan)?.price}/month`}
                </p>
              </div>
              <motion.button
                className="px-8 py-3 bg-black text-white rounded-lg text-lg font-semibold hover:bg-gray-800 transition"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={checkoutPayment}
              >
                Proceed to Checkout <ArrowRight className="inline-block ml-2" />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SubscriptionPage;
