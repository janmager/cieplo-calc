import Image from 'next/image'
import React from 'react'
import check from '@/assets/svg/check.svg'

function CustomRadioInput({setFormData, formData, item, name}: {setFormData: any, item: any, formData: any, name: any}) {
    return (
        <div onClick={() => setFormData({...formData, [name]: item.name})} className='flex cursor-pointer flex-row gap-2.5 items-center justify-start'>
            <div className={`border flex items-center justify-center rounded-full min-h-[20px] max-h-[20px] min-w-[20px] max-w-[20px] ${formData[name] == item.name ? 'border-[#FF4510] bg-[#FF4510]' : 'border-[#8E8E8E]'}`}>
                {formData[name] == item.name && <Image src={check.src} height={13} width={13} className='opacity-100' alt="check" />}
            </div>
            <span>{item.name}</span>
        </div>
    )
}

export default CustomRadioInput