import React, { useState } from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';
import TaskCard from './TaskCard';
import { RiAddFill } from "react-icons/ri";
import { CgMenuGridO } from "react-icons/cg";

const api_url = "http://localhost:3000/";

export default function KanbanView() {
  const { data, isLoading, refetch } = useQuery("projects", async () => {
    const response = await axios.get(`${api_url}projects`);
    return response.data;
  });
  if (isLoading) return <p>Carregando dados...</p>;
    
  return (      
    <div className='relative mt-28'>
      <div className='fixed top-16 h-10 w-full flex items-center bg-[#f1f3fd] justify-center'>
      <button className='flex items-center p-0 text-sm md:ml-[-20%] px-2 rounded-full bg-gray-500'><RiAddFill size={18}/><span>Create project</span></button>
      </div>
      {data.map(item => (
        <div className='flex flex-col px-4'>
        <div  className='flex items-center justify-between bg-white w-[100%] self-center rounded-full px-1 pl-2 py-1'>
          <span className='text-[#707070] text-sm font-medium'>{item.project_name}</span>
          <div className='flex items-center gap-5'>
          <button className='flex items-center py-0 text-sm px-2 rounded-full bg-gray-500'><RiAddFill size={18}/><span>Create activity</span></button>
          
          <div className='flex group items-center justify-center min-w-7 min-h-7 group bg-gray-200 transition-all hover:bg-[rgb(191,199,244)] cursor-pointer rounded-full'>
          <CgMenuGridO size={20} className='text-[#707070] group-hover:text-white transition-all'/>
          </div>
          </div>

        </div>
      <div className="flex flex-wrap gap-5 md:gap-4 pt-8 pb-10 md:pl-0">
      {item.tasks.map(item => (
        <TaskCard key={item.id} taskId={item.id} task_name={item.task_name} description={item.description} priority={item.priority} responsible={item.responsible} />
      ))}
      </div>
    </div>
      ))}
    </div>
  );
}
