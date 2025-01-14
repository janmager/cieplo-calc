import React from 'react'
import checkIcon from '@/assets/svg/check-green.svg'
import declineIcon from '@/assets/svg/x-red.svg'
import Image from 'next/image'

function CustomAdminDetailsInputData({label, data, checkBox = false, smallValue = false}: {label: string, data: any, checkBox?: boolean, smallValue?: boolean}) {
    return (
        <div className={`${checkBox ? `md:grid-cols-2 flex items-start md:items-center md:grid ${(data == 'yes' || data == 'no') ? 'flex-row' : 'flex-col'}` : smallValue ? 'md:grid-cols-6 grid' : `flex ${(data == 'yes' || data == 'no') ? 'flex-row' : 'flex-col'} md:grid-cols-4 md:grid`} gap-2 md:gap-5`}>
            <span className={`text-left flex items-center justify-startmd:justify-end md:text-right font-[500] ${smallValue ? 'md:col-span-4' : ''}`}>{label}:</span>
            {
                data == 'yes' ? 
                <img src='data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiAgd2lkdGg9IjI0IiAgaGVpZ2h0PSIyNCIgIHZpZXdCb3g9IjAgMCAyNCAyNCIgIGZpbGw9Im5vbmUiICBzdHJva2U9IiMwMDgwMDAiICBzdHJva2Utd2lkdGg9IjIiICBzdHJva2UtbGluZWNhcD0icm91bmQiICBzdHJva2UtbGluZWpvaW49InJvdW5kIiAgY2xhc3M9Imljb24gaWNvbi10YWJsZXIgaWNvbnMtdGFibGVyLW91dGxpbmUgaWNvbi10YWJsZXItY2hlY2siPjxwYXRoIHN0cm9rZT0ibm9uZSIgZD0iTTAgMGgyNHYyNEgweiIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik01IDEybDUgNWwxMCAtMTAiIC8+PC9zdmc+'/>
                // <Image src={checkIcon.src} className={`${checkBox ? 'md:ml-[-20px]' : ''}`} height={26} width={26} alt='yes' /> : 
                : data == 'no' ? 
                <img src='data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiAgd2lkdGg9IjI0IiAgaGVpZ2h0PSIyNCIgIHZpZXdCb3g9IjAgMCAyNCAyNCIgIGZpbGw9Im5vbmUiICBzdHJva2U9IiNFRTRCMkIiICBzdHJva2Utd2lkdGg9IjIiICBzdHJva2UtbGluZWNhcD0icm91bmQiICBzdHJva2UtbGluZWpvaW49InJvdW5kIiAgY2xhc3M9Imljb24gaWNvbi10YWJsZXIgaWNvbnMtdGFibGVyLW91dGxpbmUgaWNvbi10YWJsZXIteCI+PHBhdGggc3Ryb2tlPSJub25lIiBkPSJNMCAwaDI0djI0SDB6IiBmaWxsPSJub25lIi8+PHBhdGggZD0iTTE4IDZsLTEyIDEyIiAvPjxwYXRoIGQ9Ik02IDZsMTIgMTIiIC8+PC9zdmc+'/>
                // <Image src={declineIcon.src} className={`${checkBox ? 'md:ml-[-20px]' : ''}`} height={26} width={26} alt='no' />
                : null
            }
            {data != 'yes' && data != 'no' && <input value={data ? typeof data == 'object' ? data.join(', ') : data : 'nie podano'} readOnly className={`border ${checkBox ? '' : smallValue ? 'md:col-span-2' : 'md:col-span-3'} cursor-default outline-none rounded-lg h-[40px] w-full text-black px-3 flex flex-row border-[#CDCDCD]`} />}
        </div>
    )
}

export default CustomAdminDetailsInputData