import { Instalator } from '@/app/types/Instalator'
import React from 'react'
import phoneIcon from '@/assets/svg/phone-icon-2.svg'
import postIcon from '@/assets/svg/post-icon.svg'
import Image from 'next/image'

function RecommendedInstalators({instalators}: {instalators: Instalator[]}) {
  return (
    <div className='flex flex-col'>
        {
            instalators.map((instalator: Instalator, id: number) => (
                <div key={id} className='grid md:grid-cols-3 gap-3 md:gap-0 py-[16px] border-b border-[#D9D9D9]'>
                    <div className='text-[18px] font-[500]'>
                        {instalator.name}
                    </div>
                    <div className='flex flex-row gap-3 items-center md:pl-10'>
                        <Image src={phoneIcon.src} height={24} width={18} alt='phone' />
                        <span className='text-[#FF4510] text-[16px] font-[400]'>{instalator.phone}</span>
                    </div>
                    <div className='flex flex-row gap-3 items-center md:pl-10'>
                        <Image src={postIcon.src} height={30} width={24} alt='phone' />
                        <span className='text-[#FF4510] text-[16px] font-[400]'>{instalator.city}</span>
                    </div>
                </div>
            ))
        }
    </div>
  )
}

export default RecommendedInstalators