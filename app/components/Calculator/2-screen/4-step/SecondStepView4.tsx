import React from 'react'
import info from '@/assets/svg/info-icon.svg'
import Image from 'next/image'
import InputWithPlaceholder from '@/app/components/Customs/InputWithPlaceholder'

import check from '@/assets/svg/check-orange.svg'
import CustomDropdownSelect from '@/app/components/Customs/CustomDropdownSelect'
import { main_heat_sources } from '@/app/consts/main_heat_sources'
import { vent_type } from '@/app/consts/vent_type'
import { isolation_parter_floor_materials } from '@/app/consts/isolation_parter_floor_materials'
import CustomLabel from '@/app/components/Customs/CustomLabel'
import { type_of_heating_instalation } from '@/app/consts/type_of_heating_instalation'
import { hot_water_using_style } from '@/app/consts/hot_water_using_style'

function SecondStepView4({formData, setFormData}: {formData: any, setFormData: any}) {
  return (
    <div className='flex flex-col gap-14 w-full'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
            <div className='flex flex-col gap-10'>
                <div className='flex flex-col w-full'>
                    <div className='flex w-full flex-col mt-0 gap-2'>
                        <span>Główne źródło ciepła</span>
                        <CustomDropdownSelect formDataValue={'main_heat_sources'} options={main_heat_sources} setFormData={setFormData} formData={formData} placeholder={'wybierz z listy'} />
                    </div>  
                    <div className='flex w-full flex-col mt-5 gap-2'>
                        <span>Temperatura w pomieszczeniach ogrzewanych (Przeciętna temperatura utrzymywana zimą)</span>
                        <InputWithPlaceholder type={'number'} placeholder={'°C'} formDataValue1={'temp_in_heat_rooms'} formDataValue2={false} setFormData={setFormData} formData={formData} />
                    </div>
                    <div className='flex w-full flex-col mt-5 gap-2'>
                        <span>Rodzaj wentylacji</span>
                        <CustomDropdownSelect formDataValue={'vent_type'} options={vent_type} setFormData={setFormData} formData={formData} placeholder={'wybierz z listy'} />
                    </div>
                    <div className='flex mt-5 w-full flex-col gap-2'>
                        <span>Materiał</span>
                        <CustomDropdownSelect formDataValue={'heating_isolation_material'} options={isolation_parter_floor_materials} setFormData={setFormData} formData={formData} placeholder={'wybierz z listy'} />
                    </div>  
                    <div className='flex w-full flex-col mt-5 gap-2'>
                        <span>Grubość</span>
                        <InputWithPlaceholder type={'number'} placeholder={'cm'} formDataValue1={'heating_isolation_material_thickness'} formDataValue2={false} setFormData={setFormData} formData={formData} />
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
        <div className='grid grid-cols-1 md:grid-cols-2 gap-10 mt-[-10px]'>
            <div className='flex flex-col gap-10'>
                <div className='flex flex-col w-full'>
                    <CustomLabel label='Instalacja grzewcza' />
                    <div className='flex w-full flex-col mt-5 mb-8 gap-2'>
                        <span>Rodzaj instalacji centralnego ogrzewania</span>
                        <CustomDropdownSelect formDataValue={'type_of_heating_instalation'} options={type_of_heating_instalation} setFormData={setFormData} formData={formData} placeholder={'wybierz z listy'} />
                    </div> 
                    <CustomLabel label='Ciepła woda kranowa' />
                    <div className='flex w-full flex-col mt-5 gap-2'>
                        <span>Przez inżynierów zwana Ciepłą Wodą Użytkową (CWU).</span>
                        <div onClick={() => setFormData({...formData, count_need_energy_cwu: !formData.count_need_energy_cwu})} className='flex items-center cursor-pointer justify-start flex-row gap-5 mt-2'>
                            <div className='min-h-[20px] max-h-[20px] rounded max-w-[20px] min-w-[20px] flex items-center border justify-center border-[#8296AC]'>
                                {formData.count_need_energy_cwu && <Image src={check.src} height={15} width={15} alt="check" />}
                            </div>
                            <span>Oblicz zapotrzebowanie energii na podgrzewanie CWU</span>
                        </div>
                    </div> 
                    { formData.count_need_energy_cwu && 
                        <div className='flex flex-col w-full'>
                            <div className='flex w-full flex-col mt-5 gap-2'>
                                <span>Ile osób używa ciepłej wody?</span>
                                <InputWithPlaceholder type={'number'} placeholder={''} formDataValue1={'hot_water_person_using'} formDataValue2={false} setFormData={setFormData} formData={formData} />
                            </div>
                            <div className='flex w-full flex-col mt-5 gap-2'>
                                <span>Jak intensywnie używana jest ciepła woda?</span>
                                <CustomDropdownSelect formDataValue={'hot_water_using_style'} options={hot_water_using_style} setFormData={setFormData} formData={formData} placeholder={'wybierz z listy'} />
                            </div>
                        </div>
                    }
                    <div className='mt-8'>
                        <CustomLabel label='Instalacja grzewcza' />
                        <div className='flex w-full flex-col mt-5 gap-2'>
                            <span>Czy budynek posiada któreś z tych urządzeń dla wspomagania ogrzewania / przygotowania ciepłej wody?</span>
                            <div onClick={() => setFormData({...formData, hot_water_steroid_foto: !formData.hot_water_steroid_foto})} className='flex items-center cursor-pointer justify-start flex-row gap-5 mt-2'>
                                <div className='min-h-[20px] max-h-[20px] rounded max-w-[20px] min-w-[20px] flex items-center border justify-center border-[#8296AC]'>
                                    {formData.hot_water_steroid_foto && <Image src={check.src} height={15} width={15} alt="check" />}
                                </div>
                                <span>Instalacja fotowoltaiczna</span>
                            </div>
                            <div onClick={() => setFormData({...formData, hot_water_steroid_kolektor: !formData.hot_water_steroid_kolektor})} className='flex items-center cursor-pointer justify-start flex-row gap-5 mt-2'>
                                <div className='min-h-[20px] max-h-[20px] rounded max-w-[20px] min-w-[20px] flex items-center border justify-center border-[#8296AC]'>
                                    {formData.hot_water_steroid_kolektor && <Image src={check.src} height={15} width={15} alt="check" />}
                                </div>
                                <span>Kolektory słoneczne</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='hidden flex-col h-fit pb-[30px] gap-5 items-start bg-[#F8F8F8] w-full'>
                {/* <div className='flex w-full flex-row gap-5 items-start px-[20px] pt-[30px]'>
                    <div>
                        <Image src={info.src} height={24} width={24} alt="Info icon" />
                    </div>
                    <div className='flex flex-1 flex-col'>
                        <b>Jaką temperaturę podać?</b>
                        <p className='text-[14px] pt-4'>Taką, jaką uznajesz za komfortową w domu zimą bez noszenia dwóch swetrów i kaleson.<br/><br/>Za standardową temperaturę pokojową w takich obliczeniach przyjmuje się 20°C. <b>Ale jeśli marzniesz poniżej 25°C — wpisz właśnie tyle.</b> Chodzi o to, by obliczenia oddały <b>realne</b> zużycie ciepła w twoim domu.</p>
                    </div>
                </div> */}
            </div>
        </div>
    </div>
  )
}

export default SecondStepView4