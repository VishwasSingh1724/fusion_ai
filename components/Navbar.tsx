import Image from "next/image";
import logoImage from "../assets/images/logosaas.png";
import MenuIcon from "../assets/icons/menu.svg";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";


export const Navbar = () => {
  return (
  <div className="bg-black">
  <div className="px-4">
    <div className="py-4 flex items-center justify-between">
      <div className="relative">
        <div className="absolute w-full top-2 bottom-0 bg-[linear-gradient(to_right,#F87BFF,#FB92CF,#FFDD98,#C2F0B1,#2FD8FE)] blur-md"></div>
        <Image src={logoImage} alt="logo" className="h-12 w-12 relative"/>
      </div>
      <div className="border border-white border-opacity-30 h-10 w-10 inline-flex justify-center items-center rounded-lg sm:hidden">
        <MenuIcon className="text-white"/>
      </div>
      <nav className="gap-6 items-center pt-3 hidden sm:flex">
        <a href="#" className="text-opacity-60 text-white hover:text-opacity-100 transition">About</a>
        <a href="#" className="text-opacity-60 text-white hover:text-opacity-100 transition">Pricing</a>
        <a href="#" className="text-opacity-60 text-white hover:text-opacity-100 transition">Contact Us</a>
        <a href="#" className="text-opacity-60 text-white hover:text-opacity-100 transition">FAQs</a>
      </nav>
      <div>
      <SignedOut>
        <button className="bg-white py-2 px-4 rounded-lg"><Link href={"/sign-in"}>Get Started</Link></button>
            </SignedOut>
            <SignedIn>
                <UserButton />
        </SignedIn>
      </div>
    </div>
  </div>
  </div>
  );
};
