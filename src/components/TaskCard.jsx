import React from 'react'

export default function TaskCard() {
  return (
    <div className='w-[100%] md:w-80 h-48 rounded-lg p-3 bg-white shadow-sm hover:shadow-lg transition-all shadow-indigo-200 border-l-[10px] border-l-yellow-300'>
        <div className='flex items-start'>
        <span className='text-[#717171] text-lg font-medium'>Criar tabelas de demonstração financeira...</span>
        <div className='min-w-8 min-h-8 bg-[rgb(186,197,254)] cursor-pointer rounded-full'></div>
        </div>
        <div className='mt-4'>
            <span className='text-[#8e8e8e] text-sm font-medium'>Priority</span>
            <div className='w-fit bg-yellow-300 rounded-full px-2 pb-[0.8px] text-[12px] mt-1 font-medium'>Normal</div>
        </div>
        <div className='flex items-center gap-3 mt-5'>
            <div className='min-w-fit bg-[#e7e8e9] flex items-center text-sm rounded-full p-1 pr-2 gap-1'>
                <div className='w-5 h-5 rounded-full bg-[#cdcdce]'></div>
                <span className='text-[#4b4c4c] text-xs'>João da Costa</span>
            </div>
           <div className='flex items-center justify-between w-full gap-2'>
            <div className='w-[80%] rounded-full border-2 border-[#d8dee4] flex items-center overflow-hidden bg-[#e7e8e9]'>
                <div className='w-[65%] h-[5px] bg-green-400 rounded-full'></div>
            </div>
            <span className='text-[#4b4c4c] text-xs font-medium'>65%</span>
            </div>
        </div>
    </div>
  )
}
