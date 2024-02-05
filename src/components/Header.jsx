import React from 'react'

export default function Header() {
  return (
    <div className="h-16 bg-white fixed top-0 left-0 w-full z-10 flex items-center justify-between px-6">
      <span className='text-[#626161]'>LOGO</span>
        <div className='flex items-center gap-2'>
          <div className='w-7 h-7 bg-slate-400 rounded-full'></div>
          <span className='text-[#6a6969]'>joao.costa@outlook.com</span>
        </div>
      </div>
  )
}
