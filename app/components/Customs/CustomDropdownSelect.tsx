'use client'

import React, { useEffect, useState } from 'react'
import arrowDropdown from '@/assets/svg/arrow-dropdown-down.svg'
import Image from 'next/image'

function CustomDropdownSelect({placeholder, options, formDataValue, formData, setFormData}: {placeholder: any, formDataValue: any, options: any, formData: any, setFormData: any}) {
    const [ open, setOpen ] = useState(false)

    const [ currValue, setCurrValue ] = useState()

    useEffect(() => {
        if(formData[formDataValue] != currValue) setFormData({...formData, [formDataValue]: currValue})
    }, [currValue])
    
    return (
        <>
        <div className='w-full relative'>
            <div onClick={() => setOpen(!open)} className='w-full cursor-pointer border-[#CDCDCD] flex justify-between items-center flex-row border h-[60px]'>
                {!currValue && <span className='pl-5 text-[16px] opacity-30 flex-1'>{placeholder}</span>}
                {currValue && <span className='pl-5 text-[16px] flex-1'>{formData[formDataValue]}</span>}
                <div className='h-full flex w-[60px] items-center justify-center'>
                    <Image src={arrowDropdown} className={open ? 'rotate-180' : ''} alt="arrow" height={10} width={25} />
                </div>
            </div>
            {open && <div className='absolute mt-[59px] z-50 left-0 top-0 min-h-[220px] h-full overflow-y-auto max-h-[220px] bg-white flex flex-col w-full'>
                {
                    options.map((option: any, idx: any) => {
                        return (
                            <div onClick={() => { setCurrValue(option.value); setOpen(false)}} key={idx} className='h-[50px] mt-[-1px] border flex items-center pl-5 py-5 bg-white cursor-pointer hover:bg-[#FF4510] hover:text-white'>
                                {option.name}
                            </div>
                        )
                    })
                }
            </div>}
        </div>
        {open && <div onClick={() => setOpen(false)} className='w-dvw h-dvh bg-black/30 z-40 fixed top-0 left-0'></div>}
        </>
    )
}

export default CustomDropdownSelect