import CustomLabel from '@/app/components/Customs/CustomLabel'
import { building_types } from '@/app/consts/building_types'
import React from 'react'
import info from '@/assets/svg/info-icon.svg'
import Image from 'next/image'
import CustomRadioInput from '@/app/components/Customs/CustomRadioInput'

function SecondStepView0({formData, setFormData}: {formData: any, setFormData: any}) {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
        <div>
            <CustomLabel label='Wybierz lokalizację budynku:' />
            <div className='flex flex-col gap-[14px] mt-[22px]'>
                {
                    building_types.map((item: any, idx: number) => {
                        return (
                            <CustomRadioInput setFormData={setFormData} formData={formData} item={item} name='building_type' key={idx} />
                        )
                    })
                }
            </div>
        </div>
        <div className='h-full flex flex-col gap-5 lg:flex-row items-start p-[23px] w-full bg-[#F8F8F8]'>
            <div>
                <Image src={info.src} height={24} width={24} alt="Info icon" />
            </div>
            <div className='flex flex-1 flex-col'>
                <b>Najpierw zbierz informacje</b>
                <p className='pt-5 text-[15px]'>Im dokładniejsze informacje masz na temat tego jak zbudowany jest dom, tym precyzyjniejsze oszacowanie otrzymasz.</p>
                <p className='pt-5 text-[15px]'>Będziesz potrzebować m.in takich informacji:</p>
                <ul className='list-disc pl-5 text-[15px] pt-2.5'>
                    <li>zewnętrzna długość/szerokość budynku</li>
                    <li>grubość ścian zewnętrznych i materiały użyte do ich budowy</li>
                    <li>materiały użyte do izolacji dachu/podłogi na parterze czy w piwnicy</li>
                </ul>
            </div>
        </div>
    </div>
  )
}

export default SecondStepView0