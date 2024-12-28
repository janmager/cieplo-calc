import CustomLabel from '@/app/components/Customs/CustomLabel'
import { building_types } from '@/app/consts/building_types'
import React from 'react'
import info from '@/assets/svg/info-icon.svg'
import Image from 'next/image'
import CustomRadioInput from '@/app/components/Customs/CustomRadioInput'
import { building_outline } from '@/app/consts/building_outline'
import InputWithPlaceholder from '@/app/components/Customs/InputWithPlaceholder'

import regularInsideOutline from '@/assets/outlines/regular-inside.svg'
import regularOutsideOutline from '@/assets/outlines/regular-outline.svg'
import regularMoreOutline from '@/assets/outlines/regular-more.svg'
import inregularOutline from '@/assets/outlines/inregular-outline.svg'
import CustomDropdownSelect from '@/app/components/Customs/CustomDropdownSelect'
import { building_floor_plan } from '@/app/consts/building_floor_plan'
import { building_roof_plan } from '@/app/consts/building_roof_plan'

function SecondStepView1({formData, setFormData}: {formData: any, setFormData: any}) {
  return (
    <div className='flex flex-col gap-14 w-full'>
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
                    {
                        formData.building_outline == 'Znam powierzchnię zabudowy' &&
                        <div className='mt-2.5 flex flex-col gap-2'>
                            <label>Powierzchnia zabudowy</label>
                            <InputWithPlaceholder type={'number'} placeholder={'mkw.'} formDataValue1={'building_mkw'} formDataValue2={false} setFormData={setFormData} formData={formData} />
                        </div>
                    }
                </div>
            </div>
            <div className='h-full flex flex-col gap-5 items-start w-full'>
                <div className='flex w-full flex-row gap-5 items-start bg-[#F8F8F8] p-[20px]'>
                    <div>
                        <Image src={info.src} height={24} width={24} alt="Info icon" />
                    </div>
                    <div className='flex flex-1 flex-col'>
                        <b>Jaki obrys budynku jest regularny?</b>
                        <b className='text-[14px] mt-5'>Regularny</b>
                        <div className='flex gap-10 flex-row items-center justify-start'>
                            <div className='relative h-[100px] w-[100px] flex items-center justify-center'>
                                <Image src={regularInsideOutline.src} height={90} width={90} alt="Regular inside outline" className='absolute' />
                                <Image src={regularOutsideOutline.src} height={100} width={100} alt="Regular outside outline" className='absolute' />
                            </div>
                            <div className='relative h-[100px] w-[100px] flex items-center justify-center'>
                                <Image src={regularMoreOutline.src} height={100} width={120} alt="Regular inside outline" className='absolute' />
                                <Image src={regularOutsideOutline.src} height={90} width={90} alt="Regular outside outline" className='absolute mt-[-3px] mr-[-3px]' />
                            </div>
                        </div>
                        <p className='text-[14px] mt-2'>Niewielke odchyły od regularnej bryły można pominąć</p>
                        <b className='text-[14px] mt-10'>Nieregularny</b>
                        <div className='flex gap-10 flex-row items-center justify-start'>
                            <div className='relative h-[100px] w-[100px] flex items-center justify-center'>
                                <Image src={inregularOutline.src} height={96} width={96} alt="Regular inside outline" className='absolute mt-[1px]' />
                                <Image src={regularOutsideOutline.src} height={100} width={100} alt="Regular outside outline" className='absolute' />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* uklad pieter */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
            <div>
                <CustomLabel label='Układ pięter' />
                <div className='flex w-full flex-col mt-5 gap-2'>
                    <span>Dom jest</span>
                    <CustomDropdownSelect formDataValue={'house_floor_plan'} options={building_floor_plan} setFormData={setFormData} formData={formData} placeholder={'wybierz z listy'} />
                </div>
                <div className='flex w-full flex-col mt-5 gap-2'>
                    <span>Dach jest</span>
                    <CustomDropdownSelect formDataValue={'house_roof_plan'} options={building_roof_plan} setFormData={setFormData} formData={formData} placeholder={'wybierz z listy'} />
                </div>
                <p className='mt-5 text-[14px]'><b>Dach skośny bez poddasza</b> dotyczy sytuacji gdy bezpośrednio pod ten dach nie da się wejść wcale lub tylko na czworaka (np. gdy na pierwotnie płaskim dachu dobudowano dach skośny najprościej jak się dało).</p>
                <p className='mt-2.5 text-[14px]'><b>Dach skośny z poddaszem</b> to każda inna sytuacja gdy bezpośrednio pod dachem istnieje prawie pełnowymiarowa kondygnacja (zamieszkała lub nie).</p>
            </div>
            <div className='h-full flex flex-col gap-5 items-start w-full'>
                <div className='flex w-full flex-row gap-5 items-start bg-[#F8F8F8] p-[20px]'>
                    <div>
                        <Image src={info.src} height={24} width={24} alt="Info icon" />
                    </div>
                    <div className='flex flex-1 flex-col'>
                        <b>Podgląd sytuacji</b>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default SecondStepView1