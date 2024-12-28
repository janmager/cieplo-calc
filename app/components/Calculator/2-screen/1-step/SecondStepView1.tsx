import CustomLabel from '@/app/components/Customs/CustomLabel'
import { building_types } from '@/app/consts/building_types'
import React from 'react'
import info from '@/assets/png/red-info-icon.png'
import Image from 'next/image'
import CustomRadioInput from '@/app/components/Customs/CustomRadioInput'
import { building_outline } from '@/app/consts/building_outline'

function SecondStepView1({formData, setFormData}: {formData: any, setFormData: any}) {
  return (
    <div className='flex flex-col w-full'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
            <div>
                <CustomLabel label='Obrys budynku' />
                <div className='flex flex-col gap-[14px] mt-[22px]'>
                    {
                        building_outline.map((item: any, idx: number) => {
                            return (
                                <CustomRadioInput setFormData={setFormData} formData={formData} item={item} name='building_outline' key={idx} />
                            )
                        })
                    }
                </div>
            </div>
            <div className='h-full flex flex-col gap-5 items-start p-[23px] w-full'>
                <div className='flex w-full flex-row gap-5 items-start bg-[#F8F8F8] p-[20px]'>
                    <div>
                        <Image src={info.src} height={24} width={24} alt="Info icon" />
                    </div>
                    <div className='flex flex-1 flex-col'>
                        <b>Jaki obrys budynku jest regularny?</b>
                    </div>
                </div>
            </div>
        </div>        
    </div>
  )
}

export default SecondStepView1