import React from 'react'

export default function TaskCard() {
  return (
    <div className='w-80 h-40 rounded-lg p-3 bg-white shadow-sm hover:shadow-lg transition-all shadow-indigo-200 border-l-8 border-l-yellow-300'>
        <div className='flex items-start'>
        <span className='text-[#514F4F]'>Criar tabelas de demonstração financeira...</span>
        <div className='min-w-8 min-h-8 bg-[rgb(186,197,254)] cursor-pointer rounded-full'></div>
        </div>
        <div>
            <span className='text-red-400 text-sm'>Priority</span>
            <div className='w-fit bg-yellow-300 rounded-full px-2 pb-[0.8px] text-[12px] mt-1'>Normal</div>
        </div>
    </div>
  )
}
