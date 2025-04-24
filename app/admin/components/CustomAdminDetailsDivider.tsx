import React from 'react'

function CustomAdminDetailsDivider({text}: {text: string}) {
    return (
        <div className='flex flex-row gap-4 md:gap-8 items-center my-5 justify-center'>
            <div className='w-full flex-1 h-[1px] bg-gray-300'></div>
            <div className='uppercase text-center text-gray-500 text-xs md:text-sm font-bold'>{text}</div>
            <div className='w-full flex-1 h-[1px] bg-gray-300'></div>
        </div>
    )
}

export default CustomAdminDetailsDivider