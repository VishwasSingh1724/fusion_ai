// import { DashboardItems } from '@/constants'
// import Link from 'next/link'
// import React from 'react'
// import Navbar from './Navbar2'
// import { Facebook, Github, Linkedin, Mail, Twitter } from 'lucide-react'

// const Sidebar = () => {
//   return (
//     <div>

// <Navbar/>
// <aside id="logo-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700" aria-label="Sidebar">
//    <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
//       <ul className="space-y-2 font-medium">
//         {DashboardItems.map((items,i)=>(
//            <li key={items.id}>
//             <Link href={`/${items.route}`} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-600 dark:bg-gray-700 group">
//                <div className={`p-2 w-fit rounded-md bg-${items.color}-500/10`}>
//                <items.icon className={`text-${items.color}-500`}/>
//                </div>
//                <span className="ms-3">{items.name}</span>
//             </Link>
//          </li>))}
//         <div className="flex items-center p-2 text-gray-900 rounded-lg gap-2 left-0.5 group absolute bottom-2">
//          <div className="p-2 w-fit rounded-[50%] bg-violet-500/10 text-violet-500"><Github /></div>
//          <div className="p-2 w-fit rounded-[50%] bg-red-500/10 text-red-500"><Facebook /></div>
//          <div className="p-2 w-fit rounded-[50%] bg-sky-500/10 text-sky-500"><Twitter /></div>
//          <div className="p-2 w-fit rounded-[50%] bg-emerald-500/10 text-emerald-500"><Linkedin /></div>
//          <div className="p-2 w-fit rounded-[50%] bg-orange-500/10 text-orange-500"><Mail /></div>
//         </div>
//       </ul>
//    </div>
// </aside>
//     </div>
//   )
// }

// export default Sidebar

import { DashboardItems } from '@/constants';
import Link from 'next/link';
import React from 'react';
import Navbar from './Navbar2';
import { BadgeIndianRupee, Facebook, Github, Linkedin, Mail, Twitter } from 'lucide-react';

const Sidebar = () => {
  return (
    <div>
      <Navbar />
      <aside
        id="logo-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800 flex flex-col justify-between">
          {/* Dashboard Items Links */}
          <ul className="space-y-2 font-medium">
            {DashboardItems.map((items) => (
              <li key={items.id}>
                <Link
                  href={`/${items.route}`}
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-600 dark:bg-gray-700 group"
                >
                  <div className={`p-2 w-fit rounded-md bg-${items.color}-500/20`}>
                    <items.icon className={`text-${items.color}-500`} />
                  </div>
                  <span className="ms-3">{items.name}</span>
                </Link>
              </li>
            ))}
          </ul>

          {/* Huge Space (Flex Grow for spacing) */}
          <div className="flex-grow" />

          {/* Subscription Button - Above Social Media Icons */}
          <ul className="space-y-2 mb-14 font-medium">
            <li>
              <Link
                href="/subscription"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-600 dark:bg-gray-700 group"
              >
                <div className="p-2 w-fit rounded-md bg-yellow-500/20">
                  <span className="text-yellow-500"><BadgeIndianRupee /></span> {/* Calendar icon or your choice */}
                </div>
                <span className="ms-3">Subscription</span>
              </Link>
            </li>
          </ul>

          {/* Social Media Icons */}
          <div className="flex items-center p-2 text-gray-900 rounded-lg gap-2 left-0.5 group absolute bottom-2">
            <div className="p-2 w-fit rounded-[50%] bg-violet-500/20 text-violet-500">
              <Github />
            </div>
            <div className="p-2 w-fit rounded-[50%] bg-red-500/20 text-red-500">
              <Facebook />
            </div>
            <div className="p-2 w-fit rounded-[50%] bg-sky-500/20 text-sky-500">
              <Twitter />
            </div>
            <div className="p-2 w-fit rounded-[50%] bg-emerald-500/20 text-emerald-500">
              <Linkedin />
            </div>
            <div className="p-2 w-fit rounded-[50%] bg-orange-500/20 text-orange-500">
              <Mail />
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
