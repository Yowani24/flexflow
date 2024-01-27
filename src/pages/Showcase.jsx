import React, { useEffect, useRef, useState } from 'react';
import { FiUser } from "react-icons/fi";
import { FaUserCircle, FaBell } from "react-icons/fa";
import { HiLogout, HiMail } from "react-icons/hi";
import { MdWork } from "react-icons/md";
import { IoMdCloud } from "react-icons/io";
import { BsClockFill } from "react-icons/bs";
import { HiFire } from "react-icons/hi2";

import logo from "../assets/flexflowlogo2.png";

export default function Showcase() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (event) => {
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      
      const mouseXpercentage = Math.round((event.pageX / windowWidth) * 100);
      const mouseYpercentage = Math.round((event.pageY / windowHeight) * 100);
      
      setMousePosition({ x: mouseXpercentage, y: mouseYpercentage });
    };

    const handleClickOutsideMenu = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('click', handleClickOutsideMenu);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('click', handleClickOutsideMenu);
    };
  }, []);

  const handleSairClick = (event) => {
    event.stopPropagation();
    setMenuOpen(false);
  };

  return (
    <div
      style={{
        // background: `radial-gradient(at ${mousePosition.x}% ${mousePosition.y}%, lightgray, #ffffff)`,
        // width: '100vw',
        height: '100%',
      }}
      className='bg-[#f1f3fd] px-5 md:px-36'
    >
      <div className='h-24 w-full flex justify-between items-center py-10 md:py-20'>
        <div>
          <img
            className="object-cover object-center w-[150px] md:w-[200px]"
            src={logo}
            alt="nature image"
          />
        </div>
        <div ref={menuRef} className='relative flex flex-col items-center group' onClick={() => setMenuOpen(true)}>
          <div className='w-[40px] h-[40px] cursor-pointer transition bg-slate-300 rounded-full flex items-center justify-center'>
            <FiUser color='#212529' />
          </div>
          <div className={`flex flex-col gap-3 bg-[#f1f3fd] shadow-md shadow-indigo-200 mt-2 rounded-md transition absolute p-1 top-10 right-0 ${menuOpen ? 'flex' : 'hidden'}`}>
            <span className='flex items-center gap-2 text-[#5a5e63] transition hover:bg-slate-200 p-1 rounded-md font-medium text-xs cursor-pointer'><FaUserCircle size={16}/>Yowani24</span>
            <span className='flex items-center gap-2 text-[#5a5e63] transition hover:text-red-400 hover:bg-slate-200 p-1 rounded-md font-medium text-xs cursor-pointer' onClick={handleSairClick}><HiLogout size={16}/>Sair</span>
          </div>
        </div>
      </div>
      <p className='text-center mt-[10%] md:mt-[5%] text-[#212529] transition p-1 rounded-md font-medium md:text-3xl'>Olá! yowani94 👋</p>
      <div className='mt-10 md:mt-20 flex gap-5 items-center justify-center flex-wrap'>
      <div className='flex flex-col items-center px-5 w-[500px]'>
        <p className='text-[#212529] font-bold text-4xl md:text-[70px] leading-none text-left'>Innovate with FlexFlow</p>
        <p className='mt-10 text-[#212529] text-xl text-left'>Explore how our smartFlow solutions drive efficiency, enhance client collaboration, and streamline operations across your organization.</p>
        <button className='self-start mt-5 text-[#f1f3fd]'>GET STARTED</button>
      </div>
      <div
        className="h-[500px] w-[400px]"
        style={{
          backgroundImage: `url(https://images.unsplash.com/photo-1558655146-364adaf1fcc9?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      ></div>
      </div>
      <div className='mt-20'>
        <p className='text-[#212529] font-bold text-4xl md:text-[40px] text-center'>Trusted by Leaders</p>
        <p className='mt-5 text-[#212529] text-xl md:text-center'>Our commitment to excellence is reflected in the company we keep. Discover the industry giants who rely on <b>FlexFlow</b>.</p>
      </div>
      <div className='flex items-center w-full justify-center'>
        <div className="sliding-container faded flex items-center justify-center gap-8 w-[70%]">
          <div className="sliding-word text-[#212529]">Empresa A</div>
          <div className="sliding-word text-[#212529]">Empresa B</div>
          <div className="sliding-word text-[#212529]">Empresa C</div>
        </div>
      </div>

      <div className='mt-10 md:mt-20 flex gap-5 items-start justify-center flex-wrap'>
      <div className='flex flex-col items-center px-5 w-[500px] '>
        <h2 className='text-[#212529] font-bold text-[40px] self-start'>Core Features</h2>
        <p className='text-[#212529] text-lg mb-10'>Delve into the functionalities that set FlexFlow apart as the ultimate platform for workflow management and optimization.</p>
        <div className='flex flex-col gap-10'>
          <div className='flex items-start gap-4'>
          <MdWork size={40} className='text-[#212529] mt-[-6px]'/>
            <p className='flex flex-col text-[#212529]'>
              <span className='text-[#212529] font-medium text-lg'>Real-time Sync</span>
              Integrate seamlessly with real-time synchronization that keeps your team connected and on track.
            </p>
          </div>
          <div className='flex items-start gap-4'>
          <HiMail size={40} className='text-[#212529] mt-[-6px]'/>
            <p className='flex flex-col text-[#212529]'>
              <span className='text-[#212529] font-medium text-lg'>User Analytics</span>
              Gain insightful analytics on user behavior to enhance your workflow efficiency and team performance.
            </p>
          </div>
          <div className='flex items-start gap-4'>
          <FaBell size={40} className='text-[#212529] mt-[-6px]'/>
            <p className='flex flex-col text-[#212529]'>
              <span className='text-[#212529] font-medium text-lg'>Data Security</span>
              Experience top-tier data protection with our robust security framework ensuring your information remains safe.
            </p>
          </div>
          
        </div>
      </div>
      <div
        className="h-[400px] w-[400px]"
        style={{
          backgroundImage: `url(https://images.unsplash.com/photo-1506729623306-b5a934d88b53?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      ></div>
      </div>

      <section className='mt-28 mb-40 flex flex-col items-center w-fit mx-auto'>
        <h2 className='text-[#212529] font-bold text-[40px] self-start'>Why Choose Us</h2>
        <p className='text-[#212529] text-lg mb-5 font-normal self-start'>FlowShowcase is the partner you need for simplifying your processes, from automation to integration and beyond.</p>
        <div className='flex items-center gap-10 bg-[#e7ebfe] p-10 flex-wrap'>
          <div className='flex flex-col gap-4'>
          <HiFire size={25} className='text-[#212529] mt-[-6px]'/>
          <p className='flex flex-col text-[#212529] max-w-[290px]'>
            <span className='text-[#212529] font-medium text-lg'>Workflow Design</span>
            Craft bespoke workflows with our intuitive design tools that adapt to your team’s specific needs and goals.
          </p>
          </div>
          <div className='flex flex-col gap-4'>
          <BsClockFill size={22} className='text-[#212529] mt-[-6px]'/>
          <p className='flex flex-col text-[#212529] max-w-[290px]'>
            <span className='text-[#212529] font-medium text-lg'>Cloud Access</span>
            Access your workflows anywhere with our cloud-based platform, ensuring productivity on the go.
          </p>
          </div>
          <div className='flex flex-col gap-4'>
          <IoMdCloud size={25} className='text-[#212529] mt-[-6px]'/>
          <p className='flex flex-col text-[#212529] max-w-[290px]'>
            <span className='text-[#212529] font-medium text-lg'>Support 24/7</span>
            Day or night, our dedicated support team is here to help you keep your workflows running smoothly.
          </p>
          </div>
        </div>
      </section>
    </div>
  );
}
