import React from 'react'

function InputWithPlaceholder({placeholder, formDataValue1, formDataValue2, formData, setFormData, type}: {placeholder: any, type: any, formDataValue1: any, formDataValue2: any, formData: any, setFormData: any}) {
    return (
        <div className='border h-[60px] flex flex-row border-[#CDCDCD]'>
            <input className='text-[20px] px-2 text-right w-full h-full outline-none' type={type} value={formDataValue2 ? formData[formDataValue1][formDataValue2] : formData[formDataValue1]} onChange={(e) => setFormData(formDataValue2 ? {...formData, [formDataValue1]: {...formData[formDataValue1], [formDataValue2]: e.target.value}} : {...formData, [formDataValue1]: e.target.value})} />
            <div className='flex items-center cursor-default select-none pr-5 pl-3 text-[#8E8E8E]'>
                {placeholder}
            </div>
        </div>
    )
}

export default InputWithPlaceholder