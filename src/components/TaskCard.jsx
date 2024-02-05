import React from 'react'
import { AiOutlineFullscreen } from "react-icons/ai";
import TaskDetails from './TaskDetails';
import { WiTime4 } from "react-icons/wi";

export default function TaskCard({task_name, priority, responsible, description, taskId}) {
  return (
    <div className={`flex flex-col justify-between w-[100%] md:w-80 h-44 rounded-xl p-3 bg-white shadow-lg hover:shadow-xl transition-all hover:shadow-indigo-200 border-l-[5px] ${priority === "high" ?" border-red-400" : priority === "medium" ? "border-yellow-300" : priority === "low" ? "border-[rgb(186,197,254)]" : "" }`}>
        <div className='flex items-start justify-between'>
        <span className='text-[#858484] text-lg font-medium'>{task_name}</span>
        {/* <div className='flex group items-center justify-center min-w-8 min-h-8 bg-gray-200 transition-all hover:bg-[rgb(191,199,244)] cursor-pointer rounded-full'>
            <AiOutlineFullscreen size={20} className='text-gray-400 group-hover:text-gray-500 transition-all'/>
        </div> */}
        <TaskDetails taskId={taskId} task_name={task_name} description={description} priority={priority} responsible={responsible}/>
        </div>
        <div className='mt-0'>
            <div>
            <span className='text-[#8e8e8e] text-xs font-medium'>Priority</span>
            <div className='flex items-center mt-1 gap-5'>
            <div className={`w-fit ${priority === "high" ?" bg-red-400" : priority === "medium" ? "bg-yellow-300" : priority === "low" ? "bg-[rgb(186,197,254)]" : "" }  rounded-full px-2 pb-[2px] text-[12px] font-medium`}>{priority}</div>
<div className='flex items-center gap-2'>
<WiTime4 className='text-[#8e8e8e]'/>
<span className='text-[#8e8e8e]'>Jan 20</span>
</div>
            </div>
            </div>
        </div>
        <div className='flex items-center gap-3 mt-5'>
            <div className='min-w-fit bg-[#e7e8e9] flex items-center text-sm rounded-full p-1 pr-2 gap-1'>
                <div className='flex items-center justify-center w-5 h-5 rounded-full bg-[#ffffff] text-[#4b4c4c] text-xs'>{responsible.length}</div>
                <span className='text-[#4b4c4c] text-xs'>{responsible[0]}</span>
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
