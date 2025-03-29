'use client'

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowUpRight, Github, Linkedin, Twitter } from 'lucide-react'
import { BackgroundLines } from "./BackgroundLines"

export default function Footer() {
  return (
    <footer className="h-screen bg-black text-white relative overflow-hidden flex flex-col">
      {/* Animated background shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="container mx-auto px-4 flex flex-col h-full">
        {/* Animated title section */}
          <BackgroundLines className="p-2">
        <div className="flex-grow flex items-start pt-20 justify-start">
          <motion.h1 
            className="text-9xl sm:text-9xl md:text-8xl lg:text-9xl xl:text-[10rem] font-bold text-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-blue-400 text-transparent bg-clip-text ">
              FUSION AI
            </span>
          </motion.h1>
        </div>
        </BackgroundLines>

        {/* Subtitle */}
        <motion.p 
          className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto text-start absolute top-64 ml-2 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Empowering the future through artificial intelligence. Join us in shaping tomorrow's technology.
        </motion.p>

        <div className="grid md:grid-cols-2 gap-16 mt-24">
          <div>
            <h2 className="text-3xl font-bold mb-6">Stay Updated</h2>
            <p className="text-gray-400 mb-6">Get the latest updates about our AI innovations and features.</p>
            <form className="flex flex-col sm:flex-row gap-4">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-1 px-6 py-3 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:border-purple-500 z-40"
              />
              <button className="px-6 py-3 rounded-lg bg-purple-600 hover:bg-purple-700 transition-colors cursor-pointer z-40">
                Subscribe
              </button>
            </form>
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-6">Connect With Us</h2>
            <div className="flex gap-6">
              <Link href="#" className="p-4 rounded-full bg-white/5 hover:bg-white/10 transition-colors">
                <Twitter className="w-6 h-6" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="p-4 rounded-full bg-white/5 hover:bg-white/10 transition-colors">
                <Github className="w-6 h-6" />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link href="#" className="p-4 rounded-full bg-white/5 hover:bg-white/10 transition-colors">
                <Linkedin className="w-6 h-6" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8 py-16 border-t border-white/10 mt-16">
          <div>
            <h3 className="font-bold mb-4">Product</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Features</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Pricing</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">API</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Documentation</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">About</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Blog</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Careers</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Press</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Community</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Help Center</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Partners</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Status</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Privacy</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Terms</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Security</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Cookies</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center pt-8 border-t border-white/10">
          <p className="text-gray-400 mb-4 sm:mb-0">© 2024 Fusion AI. All rights reserved.</p>
          <Link href={'/'} scroll={true} className="z-40">
          <motion.button
            className="group flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 transition-colors hover:cursor-pointer z-40"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Back to top</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </motion.button>
          </Link>
        </div>
      </div>
    </footer>
  )
}

