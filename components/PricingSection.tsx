'use client'

import { motion } from 'framer-motion'

export default function PricingSection() {
  return (
    <section className="relative bg-transparent">
      {/* Gradient background that continues from how it works */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900 to-purple-700" />
      
      <div className="relative py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Pricing
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Choose the perfect plan for your needs
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              name: "Starter",
              price: "Free",
              features: [
                "Basic AI conversation",
                "Limited image generation",
                "Community support",
                "Basic templates",
              ],
            },
            {
              name: "Pro",
              price: "₹29/month",
              features: [
                "Advanced AI conversation",
                "Unlimited image generation",
                "Music generation",
                "Priority support",
                "Premium templates",
              ],
              popular: true,
            },
            {
              name: "Enterprise",
              price: "Custom",
              features: [
                "All Pro features",
                "Custom AI models",
                "API access",
                "Dedicated support",
                "Custom integration",
              ],
            },
          ].map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
            >
              <motion.div
                whileHover={{ y: -8 }}
                className={`relative h-full ${
                  plan.popular 
                    ? 'bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-2 border-purple-500' 
                    : 'bg-white/5 border border-white/10'
                } backdrop-blur-sm rounded-xl p-8`}
              >
                {plan.popular && (
                  <motion.span 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-1 rounded-full text-sm"
                  >
                    Most Popular
                  </motion.span>
                )}
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-white mb-4">{plan.name}</h3>
                  <div className="text-4xl font-bold text-white mb-6">{plan.price}</div>
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <motion.li 
                        key={featureIndex}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: featureIndex * 0.1 }}
                        className="text-white/70 flex items-center"
                      >
                        <span className="mr-2 text-purple-500">✓</span> {feature}
                      </motion.li>
                    ))}
                  </ul>
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-full py-3 px-6 rounded-lg font-medium transition-colors duration-300 ${
                      plan.popular
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:opacity-90'
                        : 'bg-white/5 text-white hover:bg-white/10'
                    }`}
                  >
                    Get Started
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

