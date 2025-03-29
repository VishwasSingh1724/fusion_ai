import React from 'react'
import { quantum } from 'ldrs'

  quantum.register()
const Loader = () => {
  return (
    <div  className="w-full flex justify-center items-center h-[60vh]">
        <l-quantum
            size="90"
            speed="2.2" 
            color="black" 
          ></l-quantum>
    </div>
  )
}

export default Loader
