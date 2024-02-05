import React, { useState } from 'react';
import { IoCloseSharp } from "react-icons/io5";
import { TbProgressCheck } from "react-icons/tb";
import { BiSolidFlagAlt } from "react-icons/bi";
import { AiOutlineFullscreen } from "react-icons/ai";


const TaskDetails = ({ task_name, priority, responsible, description, taskId }) => {
  const [showDialog, setShowDialog] = useState(false);

  return (
    <>
      <div onClick={() => setShowDialog(true)} className='flex group items-center justify-center min-w-8 min-h-8 bg-gray-200 transition-all hover:bg-[rgb(191,199,244)] cursor-pointer rounded-full'>
        <AiOutlineFullscreen size={20} className='text-gray-400 group-hover:text-white transition-all'/>
      </div>
      
      {showDialog && (
        <>
            <div className="fixed inset-0 flex items-center justify-center transition-all z-50">
            <div className="fixed inset-0 bg-black opacity-50"></div>
  
            <div className="bg-white p-5 rounded-lg z-10 w-[90%] md:w-[40%] h-[80%]">
              <div className='flex items-start justify-between w-full'>
                <p className='text-gray-600 font-medium text-xl'>{task_name}</p>
                <div onClick={() => setShowDialog(false)} className='bg-gray-200 group transition-all hover:bg-[rgb(191,199,244)] min-w-8 h-8 flex items-center justify-center rounded-full cursor-pointer'>
                  <IoCloseSharp className='text-gray-600 group-hover:text-white transition-all'/>
                </div>
              </div>
              <div className='px-0 md:px-4'>
                <div className='flex items-center justify-between mt-5'>
                  <div className='flex items-center gap-1'>
                    <BiSolidFlagAlt className='text-gray-600'/>
                    <span className={`text-white text-sm ${priority === "high" ?" bg-red-400" : priority === "medium" ? "bg-yellow-300" : priority === "low" ? "bg-[rgb(186,197,254)]" : "" } min-w-fit p1 px-2 pb-[2px] rounded-full`}>{priority}</span>
                  </div>
                  <div className='flex items-center gap-1'>
                    <TbProgressCheck className='text-gray-600'/>
                    <p className='text-gray-600 text-sm'>Progress <span className='text-green-500 font-medium'>35%</span></p>
                  </div>
                  <span className='text-white bg-gray-400 min-w-fit p1 px-2 pb-[2px] cursor-pointer text-sm rounded-full'>Reference</span>
                </div>
                <div className='text-gray-600 border-y-2 border-gray-200 py-2 mt-5 min-h-[150px]'>
                  {description}
                </div>
                <div className='mt-5'>
                  <span className='text-gray-600'>Adicionar subatividade</span>
                  <div className='flex items-center gap-4 mt-2'>
                    <input type='text'className='bg-white h-9 border-2 rounded-md border-[#11BEF4]'/>
                    <button className='h-9 px-2 py-0 bg-[#11BEF4] text-sm active:bg-[#4ea6d6] transition-all'>Adicionar</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default TaskDetails;

