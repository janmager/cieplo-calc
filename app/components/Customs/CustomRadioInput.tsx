import Image from 'next/image'
import React, { useEffect, useRef } from 'react'
import check from '@/assets/svg/check.svg'

function CustomRadioInput({setFormData, formData, item, name, errors, setErrors, hideErrorInfo = false}: {setFormData: any, item: any, formData: any, name: any, errors: any, setErrors: any, hideErrorInfo?: boolean}) {    
    const inputRef: any = useRef(null)
    
    useEffect(() => {
        if(errors[name]){
            // inputRef.current.scrollIntoView({ behavior: 'smooth' });
            window.scrollBy({
                top: inputRef.current.getBoundingClientRect().top - 260,
                left: 0,
                behavior: 'smooth',
              });
        }
    }, [errors])
    
    return (
        <>
        <div ref={inputRef} onClick={() => { setFormData({...formData, [name]: item.name});let old = errors;delete old[name];setErrors(old)}} className='flex cursor-pointer flex-row gap-2.5 items-center justify-start'>
            <div className={`border flex items-center justify-center rounded-full min-h-[20px] max-h-[20px] min-w-[20px] max-w-[20px] ${formData[name] == item.name ? 'border-[#FF4510] bg-[#FF4510]' : 'border-[#8E8E8E]'}`}>
                {formData[name] == item.name && <Image src={check.src} height={13} width={13} className='opacity-100' alt="check" />}
            </div>
            <span>{item.name}</span>
        </div>
        {errors[name] && !hideErrorInfo && <p className='mt-0 text-red-600 font-medium'>wybierz jedną z opcji</p>}
        </>
    )
}

export default CustomRadioInput