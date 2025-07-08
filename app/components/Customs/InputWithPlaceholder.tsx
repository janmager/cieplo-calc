import React, { useEffect, useRef } from 'react'

function InputWithPlaceholder({placeholder, formDataValue1, formDataValue2, formData, setFormData, type, errors, setErrors}: {placeholder: any, type: any, formDataValue1: any, formDataValue2: any, formData: any, setFormData: any, errors: any, setErrors: any}) {
    
    let errorStyle = false;
    const inputRef: any = useRef(null)

    Object.keys(errors).map((errId: string) => {
        if(formDataValue2){
            if(errId == formDataValue1+'.'+formDataValue2){
                errorStyle = true;
            }
        }
        else{
            if(errId == formDataValue1){
                errorStyle = true;
            }
        }
    })
    
    useEffect(() => {
        if(errors[formDataValue2 ? formDataValue1+'.'+formDataValue2 : formDataValue1]){
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
        <div ref={inputRef} className={`border h-[60px] flex flex-row ${errorStyle ? 'border-red-500 border-2' : 'border-[#CDCDCD]'}`}>
            <input className={`text-[20px] px-2 ${type == 'email' ? 'text-left pl-4' : 'text-right'} w-full h-full outline-none`} onWheel={(e: any) => e.target.blur()} type={type} value={formDataValue2 ? formData[formDataValue1][formDataValue2] : formData[formDataValue1]} onChange={(e) => {if(type == 'number' && Number(e.target.value) < 0) return false;setFormData(formDataValue2 ? {...formData, [formDataValue1]: {...formData[formDataValue1], [formDataValue2]: e.target.value}} : {...formData, [formDataValue1]: e.target.value});let old = errors;delete old[formDataValue2 ? formDataValue1+'.'+formDataValue2 : formDataValue1];setErrors(old)}} />
            <div className='flex items-center cursor-default select-none pr-5 pl-3 text-[#8E8E8E]'>
                {placeholder}
            </div>
        </div>
        {errorStyle && <span className='text-red-600 text-sm'>{(errorStyle && errors[formDataValue2 ? formDataValue1+'.'+formDataValue2 : formDataValue1].msg) ? errors[formDataValue2 ? formDataValue1+'.'+formDataValue2 : formDataValue1].msg : 'wprowadź prawidłowe dane'}</span> }
        </>
    )
}

export default InputWithPlaceholder