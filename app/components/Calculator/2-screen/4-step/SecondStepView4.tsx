import CustomLabel from '@/app/components/Customs/CustomLabel'
import React from 'react'
import info from '@/assets/svg/info-icon.svg'
import Image from 'next/image'
import CustomRadioInput from '@/app/components/Customs/CustomRadioInput'
import InputWithPlaceholder from '@/app/components/Customs/InputWithPlaceholder'

import CustomDropdownSelect from '@/app/components/Customs/CustomDropdownSelect'
import { doors_type } from '@/app/consts/doors_type'
import { is_roof_isolation } from '@/app/consts/is_roof_isolation'
import { isolation_roof_materials } from '@/app/consts/isolation_roof_materials'
import { isolation_parter_floor_materials } from '@/app/consts/isolation_parter_floor_materials'
import { main_heat_sources } from '@/app/consts/main_heat_sources'
import { vent_type } from '@/app/consts/vent_type'

function SecondStepView4({formData, setFormData}: {formData: any, setFormData: any}) {
  return (
    <div className='flex flex-col gap-14 w-full'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
            <div className='flex flex-col gap-10'>
                <div className='flex flex-col w-full'>
                    <div className='flex w-full flex-col mt-0 gap-2'>
                        <span>Główne źródło ciepła</span>
                        <CustomDropdownSelect formDataValue={'main_heat_source'} options={main_heat_sources} setFormData={setFormData} formData={formData} placeholder={'wybierz z listy'} />
                    </div>  
                    <div className='flex w-full flex-col mt-5 gap-2'>
                        <span>Temperatura w pomieszczeniach ogrzewanych (Przeciętna temperatura utrzymywana zimą)</span>
                        <InputWithPlaceholder type={'number'} placeholder={'°C'} formDataValue1={'temp_in_heat_rooms'} formDataValue2={false} setFormData={setFormData} formData={formData} />
                    </div>
                    <div className='flex w-full flex-col mt-5 gap-2'>
                        <span>Rodzaj wentylacji</span>
                        <CustomDropdownSelect formDataValue={'vent_type'} options={vent_type} setFormData={setFormData} formData={formData} placeholder={'wybierz z listy'} />
                    </div>
                </div>
            </div>
            <div className='flex flex-col h-fit pb-[30px] gap-5 items-start bg-[#F8F8F8] w-full'>
                <div className='flex w-full flex-row gap-5 items-start px-[20px] pt-[30px]'>
                    <div>
                        <Image src={info.src} height={24} width={24} alt="Info icon" />
                    </div>
                    <div className='flex flex-1 flex-col'>
                        <b>Jaką temperaturę podać?</b>
                        <p className='text-[14px] pt-4'>Taką, jaką uznajesz za komfortową w domu zimą bez noszenia dwóch swetrów i kaleson.<br/><br/>Za standardową temperaturę pokojową w takich obliczeniach przyjmuje się 20°C. <b>Ale jeśli marzniesz poniżej 25°C — wpisz właśnie tyle.</b> Chodzi o to, by obliczenia oddały <b>realne</b> zużycie ciepła w twoim domu.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default SecondStepView4