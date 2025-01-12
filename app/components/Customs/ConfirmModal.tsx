'use client'

import React, { useState } from 'react'

function ConfirmModal({title, desc, yesButtonText, noButtonText, onConfirm, onClose}: {title: string, desc: string, yesButtonText: string, noButtonText: string, onConfirm: any, onClose: any}) {
    const [ visible, setVisible ] = useState(true)

    const close = () => {
        setVisible(false)
        onClose()
    }

    const confirm = () => {
        onConfirm()
    }
    
    if(visible) return (
        <div className='fixed flex items-center justify-center left-0 top-0 z-[100] w-full h-full'>
            <div className='flex z-50 flex-col gap-1 bg-white max-w-[90%] md:max-w-[450px] w-full items-center justify-center px-5 py-10 rounded-lg shadow fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]'>
                <span className='text-lg text-center font-[600]'>{title}</span>
                <span className='text-[400] text-sm text-center opacity-50'>{desc}</span>

                <div className='flex mt-5 text-l font-semibold flex-row gap-5'>
                    <div className='text-white py-2.5 px-10 bg-[#FF4510] rounded flex items-center justify-center text-center cursor-pointer' onClick={confirm}>{yesButtonText}</div>
                    <div className='text-[#FF4510] cursor-pointer hover:bg-[#FF4510]/10 rounded transition-all duration-300 py-2.5 px-10 border-[#FF4510] border flex items-center justify-center text-center' onClick={close}>{noButtonText}</div>
                </div>
            </div>
            <div className='z-40 bg-black/80 w-full h-full left-0 top-0 absolute'></div>
        </div>
    )
}

export default ConfirmModal