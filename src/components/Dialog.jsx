import React, { useState } from 'react';
import { IoCloseSharp } from "react-icons/io5";
import { MdOutlineLowPriority } from "react-icons/md";
import { TbProgressCheck } from "react-icons/tb";
import { BiSolidFlagAlt } from "react-icons/bi";

const Dialog = ({ children, onClose }) => {
    const [showDialog, setShowDialog] = useState(false);
  return (
    <>
    <button onClick={() => setShowDialog(true)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Open Dialog
      </button>
    {showDialog && (
  <div className="fixed inset-0 flex items-center justify-center transition-all z-50">
    <div className="fixed inset-0 bg-black opacity-50"></div>

    <div className="bg-white p-6 rounded-lg z-10 w-[90%] md:w-[50%] h-[80%]">
        <div className='flex  items-center justify-between w-full'>
        <p className='text-gray-600 font-medium text-xl'>Criar tabelas de demonstração financeira</p>
<IoCloseSharp className='text-gray-600'/>
        </div>
        <div className='px-4'>
        <div className='flex items-center justify-between mt-5'>
            <div className='flex items-center gap-1'>
                <BiSolidFlagAlt className='text-gray-600'/>
                <span className='text-white text-sm bg-green-400 min-w-fit p1 px-2 pb-[2px] rounded-full'>Low</span>
            </div>
            <div className='flex items-center gap-1'>
                <TbProgressCheck className='text-gray-600'/>
                <p className='text-gray-600 text-sm'>Progress <span className='text-green-500 font-medium'>35%</span></p>
            </div>
            <span className='text-white bg-gray-400 min-w-fit p1 px-2 pb-[2px] cursor-pointer text-sm rounded-full'>Reference</span>
        </div>

        <div className='text-gray-600 border-y-2 border-gray-200 py-2 mt-5 min-h-[150px]'>
        O Dev Mode permite que os desenvolvedores inspecionem os designs diretamente no Figma. É como um inspetor de navegador para seus arquivos de design. Basta passar o mouse sobre os objetos para obter detalhes como medidas, especificações e estilos.
É como um inspetor de navegador para seus arquivos de design. Basta passar o mouse sobre os objetos para obter detalhes como medidas, especificações e estilos. Quando a atividade é compartilhada, se um finalizar a atividade, então aparece o nome do autor por cima como referência
        </div>

        <div className='mt-5'>
            <span className='text-gray-600'>Adicionar subatividade</span>
            <div className='flex items-center gap-4 mt-2'>
                <input type='text'className='bg-white h-9 border-2 rounded-md border-[#11BEF4]'/>
                <button className='h-9 px-2 py-0 bg-[#11BEF4] text-sm'>Adicionar</button>
            </div>
        </div>
        </div>
    </div>
  </div>
)}

    </>
    
  );
};

export default Dialog;

