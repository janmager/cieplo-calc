import CustomLabel from '@/app/components/Customs/CustomLabel'
import React, { useEffect } from 'react'
import info from '@/assets/svg/info-icon.svg'
import Image from 'next/image'
import CustomRadioInput from '@/app/components/Customs/CustomRadioInput'
import InputWithPlaceholder from '@/app/components/Customs/InputWithPlaceholder'

import CustomDropdownSelect from '@/app/components/Customs/CustomDropdownSelect'
import { is_roof_isolation } from '@/app/consts/is_roof_isolation'
import { isolation_roof_materials } from '@/app/consts/isolation_roof_materials'
import { isolation_parter_floor_materials } from '@/app/consts/isolation_parter_floor_materials'
import { unheated_over_type } from '@/app/consts/unheated_over_type'

function SecondStepView3({formData, step, setStep, setFormData, errors, setErrors}: {formData: any, step: any, setStep: any, setFormData: any, errors: any, setErrors: any}) {
    useEffect(() => {
        if(formData.building_type == 'Mieszkanie'){
            setStep(4);
        }
    }, [])
    
    return (
        <div className='flex flex-col gap-14 w-full'>
            <div className='grid grid-cols-1 md:grid-cols-12 gap-10'>
                <div className='flex flex-col gap-10 md:col-span-7'>
                    <div>
                        <CustomLabel label='Izolacja stropu między poddaszem, a piętrem poniżej' />
                        <div className='flex flex-col gap-[14px] mt-[15px] mb-[20px]'>
                            <label>Czy jest jakakolwiek izolacja dachu?</label>
                            {
                                is_roof_isolation.map((item: any, idx: number) => {
                                    return (
                                        <CustomRadioInput errors={errors} setErrors={setErrors} setFormData={setFormData} formData={formData} item={item} name='is_roof_isolation' key={idx} />
                                    )
                                })
                            }
                        </div>
                        {
                            formData.is_roof_isolation && formData.is_roof_isolation.indexOf('Tak') >= 0 &&
                            <div className='flex flex-col w-full'>
                                <div className='flex w-full flex-col mt-0 gap-2'>
                                    <span>Materiał</span>
                                    <CustomDropdownSelect errors={errors} setErrors={setErrors} formDataValue={'isolation_roof_material'} options={isolation_roof_materials} setFormData={setFormData} formData={formData} placeholder={'wybierz z listy'} />
                                </div>
                                <div className='flex w-full flex-col mt-5 gap-2'>
                                    <span>Grubość</span>
                                    <InputWithPlaceholder errors={errors} setErrors={setErrors} type={'number'} placeholder={'cm'} formDataValue1={'isolation_roof_thickness'} formDataValue2={false} setFormData={setFormData} formData={formData} />
                                </div>
                            </div>
                        }
                    </div>
                    <div>
                        <CustomLabel label='Izolacja podłogi parteru' />
                        <div className='flex flex-col gap-[14px] mt-[15px] mb-[20px]'>
                            <label>Czy jest jakakolwiek izolacja podłogi parteru?</label>
                            {
                                is_roof_isolation.map((item: any, idx: number) => {
                                    return (
                                        <CustomRadioInput errors={errors} setErrors={setErrors} setFormData={setFormData} formData={formData} item={item} name='is_parter_floor_isolation' key={idx} />
                                    )
                                })
                            }
                        </div>
                        {
                            formData.is_parter_floor_isolation && formData.is_parter_floor_isolation.indexOf('Tak') >= 0 &&
                            <div className='flex flex-col w-full'>
                                <div className='flex w-full flex-col mt-0 gap-2'>
                                    <span>Materiał</span>
                                    <CustomDropdownSelect errors={errors} setErrors={setErrors} formDataValue={'isolation_parter_floor_material'} options={isolation_parter_floor_materials} setFormData={setFormData} formData={formData} placeholder={'wybierz z listy'} />
                                </div>  
                                <div className='flex w-full flex-col mt-5 gap-2'>
                                    <span>Grubość</span>
                                    <InputWithPlaceholder errors={errors} setErrors={setErrors} type={'number'} placeholder={'cm'} formDataValue1={'isolation_parter_floor_thickness'} formDataValue2={false} setFormData={setFormData} formData={formData} />
                                </div>
                            </div>
                        }
                    </div>
                    {(formData.heating_levels.indexOf('Poddasze') == -1 && formData.house_roof_plan.toLowerCase() == 'skośny z poddaszem') && <div>
                        <CustomLabel label='Nieogrzewane poddasze' />
                        <div className='flex w-full flex-col mt-2.5 gap-4'>
                            <span>Jak wygląda sytuacja na nieogrzewanym poddaszu?</span>
                            <CustomDropdownSelect errors={errors} setErrors={setErrors} formDataValue={'unheated_space_type'} options={unheated_over_type} setFormData={setFormData} formData={formData} placeholder={'wybierz z listy'} />
                        </div>
                    </div>}
                </div>
                <div className='flex flex-col h-fit pb-[30px] md:col-span-5 gap-5 items-start bg-[#F8F8F8] w-full'>
                    <div className='flex w-full flex-row gap-5 items-start px-[20px] pt-[30px]'>
                        <div>
                            <Image src={info.src} height={24} width={24} alt="Info icon" />
                        </div>
                        <div className='flex flex-1 flex-col'>
                            <p className='text-[14px]'>Podaj, czy i jak izolowane są pomieszczenia ogrzewane od góry i od dołu budynku.</p>
                        </div>
                    </div>
                    <div className='flex w-full flex-row gap-5 items-start px-[20px] pt-[30px]'>
                        <div>
                            <Image src={info.src} height={24} width={24} alt="Info icon" />
                        </div>
                        <div className='flex flex-1 flex-col'>
                            <p className='text-[14px]'>Izolacja to nie tylko styropian i wełna mineralna! Liczy się także np. trzcina, słoma, trociny czy żużel (na płaskim dachu).</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SecondStepView3