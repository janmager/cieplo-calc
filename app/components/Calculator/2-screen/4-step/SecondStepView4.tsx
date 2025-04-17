import React, { useEffect } from 'react'
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
import { max_temp_of_power_instalation } from '@/app/consts/max_temp_of_power_instalation'
import { whats_over } from '@/app/consts/whats_over'
import { whats_under } from '@/app/consts/whats_under'
import { whats_near } from '@/app/consts/whats_near'

function SecondStepView4({formData, setFormData, errors, setErrors}: {formData: any, setFormData: any, errors: any, setErrors: any}) {
    useEffect(() => {
        setFormData({...formData, type_of_heating_instalation: '', max_temp_of_power_instalation: ''})
    }, [formData.main_heat_sources])
    return (
        <div className='flex flex-col gap-14 w-full'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
                <div className='flex flex-col gap-10'>
                    <div className='flex flex-col w-full'>
                        <div className='flex w-full flex-col mt-0 gap-2'>
                            <span>Główne źródło ciepła</span>
                            <CustomDropdownSelect disabled={true} errors={errors} setErrors={setErrors} formDataValue={'main_heat_sources'} options={main_heat_sources} setFormData={setFormData} formData={formData} placeholder={'wybierz z listy'} />
                        </div>  
                        <div className='flex w-full flex-col mt-5 gap-2'>
                            <span>Temperatura w pomieszczeniach ogrzewanych (przeciętna temperatura utrzymywana zimą)</span>
                            <InputWithPlaceholder errors={errors} setErrors={setErrors} type={'number'} placeholder={'°C'} formDataValue1={'temp_in_heat_rooms'} formDataValue2={false} setFormData={setFormData} formData={formData} />
                        </div>
                        <div className='flex w-full flex-col mt-5 gap-2'>
                            <span>Rodzaj wentylacji</span>
                            <CustomDropdownSelect errors={errors} setErrors={setErrors} formDataValue={'vent_type'} options={vent_type} setFormData={setFormData} formData={formData} placeholder={'wybierz z listy'} />
                        </div>
                        {/* <div className='flex mt-5 w-full flex-col gap-2'>
                            <span>Materiał</span>
                            <CustomDropdownSelect formDataValue={'heating_isolation_material'} options={isolation_parter_floor_materials} setFormData={setFormData} formData={formData} placeholder={'wybierz z listy'} />
                        </div>  
                        <div className='flex w-full flex-col mt-5 gap-2'>
                            <span>Grubość</span>
                            <InputWithPlaceholder type={'number'} placeholder={'cm'} formDataValue1={'heating_isolation_material_thickness'} formDataValue2={false} setFormData={setFormData} formData={formData} />
                        </div> */}
                    </div>
                </div>
                <div className='flex flex-col h-fit pb-[30px] gap-5 items-start bg-[#F8F8F8] w-full'>
                    <div className='flex w-full flex-row gap-5 items-start px-[20px] pt-[30px]'>
                        <div>
                            <Image src={info.src} height={24} width={24} alt="Info icon" />
                        </div>
                        <div className='flex flex-1 flex-col'>
                            <b>Jaką temperaturę podać?</b>
                            <p className='text-[14px] pt-4'>Za standardową temperaturę pokojową w takich obliczeniach przyjmuje się 20°C. <b>Ale jeśli marzniesz poniżej 25°C — wpisz właśnie tyle.</b> Chodzi o to, by obliczenia oddały <b>realne</b> zużycie ciepła w twoim domu.<br/><br/>Pamiętaj jednak, że im wyższa temperatura w pomieszczeniu, tym więcej ciepła do budynku będziemy musieli dostarczyć – w efekcie wymagana będzie mocniejsza pompa ciepła.</p>
                        </div>
                    </div>
                </div>
            </div>
            {
                formData.building_type == 'Segment w zabudowanie szeregowej' &&
                <div>
                    <CustomLabel label='Lokalizacja budynku' />
                    <div className='flex w-full flex-col mt-5 gap-2'>
                        <span>Czy segment w zabudowie szeregowej znajduje się na końcu/początku szeregu?</span>
                        <div onClick={() => setFormData({...formData, on_corner: true})} className='flex items-center cursor-pointer justify-start flex-row gap-5 mt-2'>
                            <div className='min-h-[20px] max-h-[20px] rounded max-w-[20px] min-w-[20px] flex items-center border justify-center border-[#8296AC]'>
                                {formData.on_corner && <Image src={check.src} height={15} width={15} alt="check" />}
                            </div>
                            <span>Tak</span>
                        </div>
                        <div onClick={() => setFormData({...formData, on_corner: false})} className='flex items-center cursor-pointer justify-start flex-row gap-5 mt-2'>
                            <div className='min-h-[20px] max-h-[20px] rounded max-w-[20px] min-w-[20px] flex items-center border justify-center border-[#8296AC]'>
                                {!formData.on_corner && <Image src={check.src} height={15} width={15} alt="check" />}
                            </div>
                            <span>Nie</span>
                        </div>
                    </div>
                </div>
            }
            {formData.building_type == 'Mieszkanie' && <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
                <div className='flex flex-col gap-5'>
                    <CustomLabel label='Lokalizacja mieszkania' />
                    <div className='flex flex-col w-full'>
                        <div className='flex w-full flex-col mt-0 gap-2'>
                            <span>Co znajduje się powyżej mieszkania?</span>
                            <CustomDropdownSelect errors={errors} setErrors={setErrors} formDataValue={'whats_over'} options={whats_over} setFormData={setFormData} formData={formData} placeholder={'wybierz z listy'} />
                        </div>
                    </div>
                    <div className='flex flex-col w-full'>
                        <div className='flex w-full flex-col mt-0 gap-2'>
                            <span>Co znajduje się poniżej mieszkania?</span>
                            <CustomDropdownSelect errors={errors} setErrors={setErrors} formDataValue={'whats_under'} options={whats_under} setFormData={setFormData} formData={formData} placeholder={'wybierz z listy'} />
                        </div>
                    </div>
                    <div className='flex flex-col w-full'>
                        <div className='flex w-full flex-col mt-0 gap-2'>
                            <span>Co znajduje się w sąsiedztwie mieszkania? (północ)</span>
                            <CustomDropdownSelect errors={errors} setErrors={setErrors} formDataValue={'whats_north'} options={whats_near} setFormData={setFormData} formData={formData} placeholder={'wybierz z listy'} />
                        </div>
                    </div>
                    <div className='flex flex-col w-full'>
                        <div className='flex w-full flex-col mt-0 gap-2'>
                            <span>Co znajduje się w sąsiedztwie mieszkania? (wschód)</span>
                            <CustomDropdownSelect errors={errors} setErrors={setErrors}formDataValue={'whats_east'} options={whats_near} setFormData={setFormData} formData={formData} placeholder={'wybierz z listy'} />
                        </div>
                    </div>
                    <div className='flex flex-col w-full'>
                        <div className='flex w-full flex-col mt-0 gap-2'>
                            <span>Co znajduje się w sąsiedztwie mieszkania? (południe)</span>
                            <CustomDropdownSelect errors={errors} setErrors={setErrors} formDataValue={'whats_south'} options={whats_near} setFormData={setFormData} formData={formData} placeholder={'wybierz z listy'} />
                        </div>
                    </div>
                    <div className='flex flex-col w-full'>
                        <div className='flex w-full flex-col mt-0 gap-2'>
                            <span>Co znajduje się w sąsiedztwie mieszkania? (zachód)</span>
                            <CustomDropdownSelect errors={errors} setErrors={setErrors} formDataValue={'whats_west'} options={whats_near} setFormData={setFormData} formData={formData} placeholder={'wybierz z listy'} />
                        </div>
                    </div>
                </div>
            </div>}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-10 mt-[-10px]'>
                <div className='flex flex-col gap-10'>
                    <div className='flex flex-col w-full'>
                        { (formData.main_heat_sources == 'Pompa ciepła powietrze-woda' || formData.main_heat_sources == 'Pompa ciepła gruntowa' || formData.main_heat_sources == 'Kocioł na drewno z buforem ciepła' || formData.main_heat_sources == 'Kocioł na drewno' || formData.main_heat_sources == 'Kocioł na pellet drzewny' || formData.main_heat_sources == 'Kocioł na zrębkę drzewną' || formData.main_heat_sources == 'Kocioł gazowy kondensacyjny' || formData.main_heat_sources == 'Kocioł gazowy niekondensacyjny' || formData.main_heat_sources == 'Kocioł węglowy bez podajnika z buforem ciepła' || formData.main_heat_sources == 'Kocioł węglowy bez podajnika' || formData.main_heat_sources == 'Kocioł węglowy z podajnikiem' || formData.main_heat_sources == 'Kocioł olejowy' || formData.main_heat_sources == 'Kominek' || formData.main_heat_sources == 'Sieć ciepłownicza') && <>
                            <CustomLabel label='Instalacja grzewcza' />
                            <div className='flex w-full flex-col mt-5 mb-7 gap-2'>
                                <span>Rodzaj instalacji centralnego ogrzewania</span>
                                <CustomDropdownSelect errors={errors} setErrors={setErrors} formDataValue={'type_of_heating_instalation'} options={type_of_heating_instalation} setFormData={setFormData} formData={formData} placeholder={'wybierz z listy'} />
                            </div>
                        </>}
                        {/* {(formData.type_of_heating_instalation.indexOf('100% grzejniki') >= 0 || formData.type_of_heating_instalation.indexOf('Mniej więcej po równo') >= 0 || formData.type_of_heating_instalation.indexOf('Przewaga') >= 0) && <> */}
                        <div className='flex w-full flex-col mb-5 gap-2'>
                            <span>Maksymalna temperatura zasilania instalacji</span>
                            <CustomDropdownSelect errors={errors} setErrors={setErrors} formDataValue={'max_temp_of_power_instalation'} options={max_temp_of_power_instalation} setFormData={setFormData} formData={formData} placeholder={'wybierz z listy'} />
                        </div>
                        <div className='flex flex-row gap-5 w-full mb-10 px-2.5 items-start mt-0'>
                            <Image src={info.src} height={22} width={22} className='w-[22px] h-[22px]' alt='alert icon' />
                            <p className='w-full flex-1 mt-[-5px]'>Jaką max. temperaturą zasilane są grzejniki w największe mrozy?</p>
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
                                    <InputWithPlaceholder errors={errors} setErrors={setErrors} type={'number'} placeholder={''} formDataValue1={'hot_water_person_using'} formDataValue2={false} setFormData={setFormData} formData={formData} />
                                </div>
                                <div className='flex w-full flex-col mt-5 gap-2'>
                                    <span>Jak intensywnie używana jest ciepła woda?</span>
                                    <CustomDropdownSelect errors={errors} setErrors={setErrors} formDataValue={'hot_water_using_style'} options={hot_water_using_style} setFormData={setFormData} formData={formData} placeholder={'wybierz z listy'} />
                                </div>
                            </div>
                        }
                        {/* <div className='mt-8'>
                            <CustomLabel label='Dodatkowa instalacja grzewcza' />
                            <div className='flex w-full flex-col mt-5 gap-2'>
                                <span>Czy budynek posiada któreś z tych urządzeń służące do wspomagania ogrzewania / przygotowania ciepłej wody?</span>
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
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SecondStepView4