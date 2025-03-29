import { LucideIcon } from 'lucide-react'
import React from 'react'

const Header = ({ title,description ,icon:Icon , iconColor,bgColor}:{title:string,description:string,icon:LucideIcon,iconColor:string,bgColor:string}) => {
  return (
    <>
    <div className='py-5 flex items-center gap-x-3 mb-3 mt-3'>
          <div className={`p-2 w-fit rounded-md bg-${bgColor}-500/20`}>
                <Icon className={`w-10 h-10 text-${iconColor}-500`}/>
          </div>
          <div>
            <h2 className='text-3xl pl-3 font-bold'>
                   {title}
            </h2>
            <p className='text-sm pl-3 text-muted-foreground'>
                {description}
            </p>
          </div>
    </div>
    </>
  )
}

export default Header
