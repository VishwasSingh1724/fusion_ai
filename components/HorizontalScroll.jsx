// import Image from "next/image";
// import React,{ useEffect, useRef } from "react";
// import { list } from "@/constants";

// const HorizontalScrollSection = () => {
//     const containerRef = useRef(null); 
//     const scrollRef = useRef(null);
  
 
    


//     useEffect(() => {
//       const onScroll = () => {
//         if (!containerRef.current || !scrollRef.current) return;
        
//         const containerRect = containerRef.current.getBoundingClientRect();
//         const scrollableDistance = scrollRef.current.scrollWidth - window.innerWidth;
        
//         // Calculate how far through the section we've scrolled (0-1)
//         const percentageScrolled = containerRect.top / (containerRect.height - window.innerHeight);
//         const clampedPercentage = Math.max(0, Math.min(1, -percentageScrolled));
        
//         // Apply the transform
//         const translateX = scrollableDistance * clampedPercentage;
//         scrollRef.current.style.transform = `translateX(-${translateX}px)`;
//       };
  
//       window.addEventListener('scroll', onScroll);
//       onScroll(); // Initial position
  
//       return () => window.removeEventListener('scroll', onScroll);
//     }, []);
  
//     return (
//       <div ref={containerRef} className="relative h-[200vh]">
//         <div className="sticky top-0 h-screen overflow-hidden bg-gradient-to-b from-purple-900 to-purple-900">
//           <div
//             ref={scrollRef}
//             className="flex h-full"
//             style={{ width: '80%' }}
//           >
//             {list.map(
//               (image, index) => (
//                 <div
//                   key={index}
//                   className="h-full w-[45vh] flex-none flex items-center justify-center "
//                 >
//                   <img
//                     src={image.imageUrl}
//                     alt={`Scrolling image ${index + 1}`}
//                     width={350}
//                     height={150}
//                     className="rounded-lg shadow-lg h-[50vh]"
//                     priority={index === 0}
//                   />
//                 </div>
//               )
//             )}
//           </div>
//         </div>
//       </div>
//     );
//   };
  
//   export default HorizontalScrollSection;

import { list } from "@/constants";
import React, { useEffect, useRef } from "react";
import WaveyImage from "./WaveyImage";

const HorizontalScrollSection = () => {
  const containerRef = useRef(null);
  const scrollRef = useRef(null);
  const imageContainerRefs = useRef([]);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || !scrollRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      const scrollableDistance = scrollRef.current.scrollWidth - window.innerWidth;

      const percentageScrolled =
        -containerRect.top / (containerRect.height - window.innerHeight);
      const clampedPercentage = Math.max(0, Math.min(1, percentageScrolled));

      // Horizontal scroll
      const translateX = scrollableDistance * clampedPercentage;
      scrollRef.current.style.transform = `translateX(-${translateX}px)`;

      // Vertical movement for image containers (increased movement)
      imageContainerRefs.current.forEach((containerRef, index) => {
        if (!containerRef) return;

        // Vertical movement
        const maxVerticalMovement = 100; // Maximum vertical movement in pixels
        const verticalOffset =
          Math.sin(clampedPercentage * Math.PI * 2 + index) *
          maxVerticalMovement;
        containerRef.style.transform = `translateY(${verticalOffset}px)`;
      });
    };

    // Intersection observer for fade-in and fade-out
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const target = entry.target;
          if (entry.isIntersecting) {
            target.style.opacity = "1";
            target.style.transition = "opacity 0.5s ease-in-out";
          } else {
            target.style.opacity = "0";
            target.style.transition = "opacity 0.5s ease-in-out";
          }
        });
      },
      { root: null, threshold: 0.2 } // Adjust threshold for when to fade in/out
    );

    // Attach observer to each container
    imageContainerRefs.current.forEach((containerRef) => {
      if (containerRef) observer.observe(containerRef);
    });

    // Resize handler to recalculate the width of the scroll container
    const calculateScrollWidth = () => {
      if (scrollRef.current) {
        const totalWidth = Array.from(scrollRef.current.children).reduce(
          (sum, child) =>
            sum + child.offsetWidth, // Just take the offsetWidth without margins
          0
        );

        scrollRef.current.style.width = `${totalWidth}px`;
      }
    };

    calculateScrollWidth();
    window.addEventListener("resize", calculateScrollWidth);
    window.addEventListener("scroll", handleScroll);

    handleScroll();

    return () => {
      window.removeEventListener("resize", calculateScrollWidth);
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative h-[200vh] bg-purple-900 text-white font-serif"
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <div
          ref={scrollRef}
          className="flex h-full gap-[3vw]"
        >
          {list.map((image, index) => (
            <div
              key={index}
              ref={(el) => (imageContainerRefs.current[index] = el)}
              className={`relative flex-none grid w-[29vmax] ${
                index % 2 === 1 ? "mt-[10vh]" : "mt-0"
              }`}
              style={{
                gridTemplateColumns: "8rem 21vmax",
                gridTemplateRows: "8rem 28vmax 3rem",
                transition: "transform 0.3s ease-out",
                opacity: "0", // Initially hidden
              }}
            >
              {/* Caption Area */}
              <div className="col-span-2 row-span-3 grid grid-cols-[8rem_auto] grid-rows-[8rem_auto_3rem]">
                <span className="text-[clamp(2.5rem,9vw,4.5rem)] text-white justify-self-end pr-8 self-center font-italic font-extrabold">
                  {(index + 1).toString().padStart(2, "0")}
                </span>

                <h2 className="text-[clamp(2rem,5vw,4rem)] text-purple-500/60 self-center font-italic font-extrabold z-30">
                  {image.title || `Image ${index + 1}`}
                </h2>
              </div>

              {/* Image Container */}
              <div className="col-start-2 row-start-2 relative overflow-hidden w-full h-full">
                <div
                  className="absolute top-0 left-0 w-full h-[calc(100%+20vh)] -mt-[7vh] transform will-change-transform"
                >
                  <WaveyImage
                    imageUrl={image.imageUrl}
                    alt={`Gallery image ${index + 1}`}
                    className="object-cover object-center w-full h-full"
                    loading={index === 0 ? "eager" : "lazy"}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HorizontalScrollSection;
