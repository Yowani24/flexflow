import React from 'react'
import { RxDashboard } from "react-icons/rx";
import { FaTasks } from "react-icons/fa";
import { MdManageHistory } from "react-icons/md";
import { TbLogout } from "react-icons/tb";

export default function SideBar() {
  return (
    <div className="hidden md:w-[10%] h-full fixed top-0 left-0 overflow-y-auto md:flex items-start justify-center">
    <div className='relative flex flex-col items-center py-5 justify-start gap-4 bg-[rgb(186,197,254)] w-[50%] h-[80%] mt-[112px] rounded-lg'>
<div className='flex flex-col items-center justify-start gap-4'>
<div className='bg-[rgb(105,128,240)] hover:bg-[rgb(57,85,224)] cursor-pointer transition-all w-10 h-10 rounded-lg flex items-center justify-center'>
<RxDashboard size={20}/>
</div>
<div className='bg-[rgb(105,128,240)] hover:bg-[rgb(57,85,224)] cursor-pointer transition-all w-10 h-10 rounded-lg flex items-center justify-center'>
<FaTasks size={20}/>
</div>
<div className='bg-[rgb(105,128,240)] hover:bg-[rgb(57,85,224)] cursor-pointer transition-all w-10 h-10 rounded-lg flex items-center justify-center'>
<MdManageHistory size={20}/>
</div>
</div>
<div className='bg-[rgb(105,128,240)] hover:bg-[rgb(57,85,224)] cursor-pointer absolute bottom-5 transition-all w-10 h-10 rounded-lg flex items-center justify-center'>
<TbLogout size={20}/>
</div>

    </div>
  </div>
  )
}
