import CustomLabel from '@/app/components/Customs/CustomLabel'
import React, { useEffect } from 'react'
import info from '@/assets/svg/info-icon.svg'
import Image from 'next/image'
import CustomRadioInput from '@/app/components/Customs/CustomRadioInput'
import InputWithPlaceholder from '@/app/components/Customs/InputWithPlaceholder'

import check from '@/assets/svg/check-orange.svg'
import { building_construction_type } from '@/app/consts/building_construction_type'
import { basic_construction_material } from '@/app/consts/basic_construction_material'
import CustomDropdownSelect from '@/app/components/Customs/CustomDropdownSelect'
import { doors_type } from '@/app/consts/doors_type'
import { additional_construction_material } from '@/app/consts/additional_construction_material'
import { outside_insulation } from '@/app/consts/outside_insulation'
import { windows_type } from '@/app/consts/windows_type'
import { wall_insulation } from '@/app/consts/wall_insulation'

function SecondStepView2({formData, setFormData, errors, setErrors}: {formData: any, setFormData: any, errors: any, setErrors: any}) {
    useEffect(() => {
        if(formData.building_construction_type.indexOf('Tradycyjna') == -1) setFormData({...formData, basic_construction_material: '', additional_construction_material: '', wall_insulation: formData.building_construction_type.indexOf('Szkieletowa') >= 0 ? true : false})
    }, [formData.building_construction_type])

    return (
        <div className='flex flex-col gap-14 w-full'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
                <div className='flex flex-col gap-10'>
                    <div>
                        <CustomLabel label='Zaznacz rodzaj konstrukcji budynku' />
                        <div className='flex flex-col gap-[14px] mt-[22px]'>
                            {
                                building_construction_type.map((item: any, idx: number) => {
                                    return (
                                        <CustomRadioInput errors={errors} setErrors={setErrors} setFormData={setFormData} formData={formData} item={item} name='building_construction_type' key={idx} />
                                    )
                                })
                            }
                            <div className='mt-2.5 flex flex-col gap-2'>
                                <label>Całkowita (razem z ew. dociepleniem) grubość ścian zewnętrznych</label>
                                <InputWithPlaceholder errors={errors} setErrors={setErrors} type={'number'} placeholder={'cm'} formDataValue1={'total_wall_thickness'} formDataValue2={false} setFormData={setFormData} formData={formData} />
                            </div>
                            <div className='flex flex-row gap-5 w-full px-2.5 items-center mt-0'>
                                <Image src={info.src} height={22} width={22} className='w-[22px] h-[22px]' alt='alert icon' />
                                <p className='w-full text-sm flex-1'>np. jeśli ściana zewnętrzna Twojego budynku składa się z porothermu o grubości 25 cm i styropianu o grubości 15 cm, to wpisz 40 cm.</p>
                            </div>
                        </div>
                    </div>
                    {formData.building_construction_type.indexOf('Tradycyjna') >= 0 && <div>
                        <CustomLabel label='Materiały konstrukcyjne' />
                        <div className='flex w-full flex-col mt-5 gap-2'>
                            <span>Podstawowy materiał</span>
                            <CustomDropdownSelect errors={errors} setErrors={setErrors} formDataValue={'basic_construction_material'} options={basic_construction_material} setFormData={setFormData} formData={formData} placeholder={'wybierz z listy'} />
                        </div>
                        <div className='flex w-full flex-col mt-5 gap-2'>
                            <span>Dodatkowy materiał</span>
                            <CustomDropdownSelect errors={errors} setErrors={setErrors} formDataValue={'additional_construction_material'} options={additional_construction_material} setFormData={setFormData} formData={formData} placeholder={'wybierz z listy'} />
                        </div>
                        <div className='flex flex-row gap-5 w-full px-2.5 items-start mt-5'>
                            <Image src={info.src} height={22} width={22} className='w-[22px] h-[22px]' alt='alert icon' />
                            <p className='w-full flex-1 mt-[-5px]'>Jeśli ściany zewn. są z mieszanych materiałów, np. pustaka żużlowego i cegieł, tutaj wskaż drugi najczęściej występujący materiał. Zostaw pole puste, jeśli ściany są z jednego materiału.</p>
                        </div>
                    </div>}
                    <div>
                        <CustomLabel label='Izolacja wewnątrz ściany' />
                        <div onClick={() => formData.building_construction_type.indexOf('Szkieletowa') == -1 ? setFormData({...formData, wall_insulation: !formData.wall_insulation}) : null} className='flex items-center cursor-pointer justify-start flex-row gap-5 mt-5'>
                            <div className='min-h-[20px] max-h-[20px] rounded max-w-[20px] min-w-[20px] flex items-center border justify-center border-[#8296AC]'>
                                {formData.wall_insulation && <Image src={check.src} height={15} width={15} alt="check" />}
                            </div>
                            <span>Ściana ma izolację w środku</span>
                        </div>
                        {
                            formData.wall_insulation &&
                            <div className='flex flex-col gap-0'>
                                <div className='flex w-full flex-col mt-5 gap-2'>
                                    <span>Izolacja wewnątrz ściany</span>
                                    <CustomDropdownSelect errors={errors} setErrors={setErrors} formDataValue={'wall_inside_insulation'} options={wall_insulation} setFormData={setFormData} formData={formData} placeholder={'wybierz z listy'} />
                                </div>
                                <div className='flex w-full flex-col mt-5 gap-2'>
                                    <span>Grubość</span>
                                    <InputWithPlaceholder errors={errors} setErrors={setErrors} type={'number'} placeholder={'cm'} formDataValue1={'wall_insulation_thickness'} formDataValue2={false} setFormData={setFormData} formData={formData} />
                                </div>
                            </div>
                        }
                    </div>
                    <div>
                        <CustomLabel label='Docieplenie' />
                        <div onClick={() => setFormData({...formData, house_insulation: !formData.house_insulation})} className='flex items-center cursor-pointer justify-start flex-row gap-5 mt-5'>
                            <div className='min-h-[20px] max-h-[20px] rounded max-w-[20px] min-w-[20px] flex items-center border justify-center border-[#8296AC]'>
                                {formData.house_insulation && <Image src={check.src} height={15} width={15} alt="check" />}
                            </div>
                            <span>Dom jest docieplony</span>
                        </div>
                        {
                            formData.house_insulation &&
                            <div className='flex flex-col gap-0'>
                                <div className='flex w-full flex-col mt-5 gap-2'>
                                    <span>Docieplenie od zewnątrz</span>
                                    <CustomDropdownSelect errors={errors} setErrors={setErrors} formDataValue={'outside_insulation'} options={outside_insulation} setFormData={setFormData} formData={formData} placeholder={'wybierz z listy'} />
                                </div>
                                <div className='flex w-full flex-col mt-5 gap-2'>
                                    <span>Grubość</span>
                                    <InputWithPlaceholder errors={errors} setErrors={setErrors} type={'number'} placeholder={'cm'} formDataValue1={'insulation_thickness'} formDataValue2={false} setFormData={setFormData} formData={formData} />
                                </div>
                                <div className='flex flex-row gap-5 w-full px-2.5 items-center mt-5'>
                                    <Image src={info.src} height={22} width={22} className='w-[22px] h-[22px]' alt='alert icon' />
                                    <p className='w-full flex-1'>W tym miejscu wpisz, jakiego materiału użyto do izolacji ścian zewnętrznych</p>
                                </div>
                            </div>
                        }
                    </div>
                </div>
                <div className='flex h-fit flex-col pb-[30px] gap-5 items-start bg-[#F8F8F8] w-full'>
                    <div className='flex w-full flex-row gap-5 items-start px-[20px] pt-[30px]'>
                        <div>
                            <Image src={info.src} height={24} width={24} alt="Info icon" />
                        </div>
                        <div className='flex flex-1 flex-col'>
                            <b>Czym się różnią te rodzaje konstrukcji budynku?</b>
                            <p className='text-[14px] pt-4'>Konstrukcja tradycyjna to ciężkie ściany z "pełnych" materiałów, np. betonu, cegły czy drewnianych bali. Czyli znakomita większość budynków w tym kraju.<br/><br/>Konstrukcja szkieletowa (dom kanadyjski) to budynek na drewnianym szkielecie nośnym, gdzie wypełnienie ścian stanowi izolacja (np. wełna mineralna).</p>
                        </div>
                    </div>

                    <div className='flex w-full flex-row gap-5 items-start pt-2.5 px-[20px]'>
                        <div>
                            <Image src={info.src} height={24} width={24} alt="Info icon" />
                        </div>
                        <div className='flex flex-1 flex-col'>
                            <b>Czy ściana ma jakąś izolację w środku?</b>
                            <p className='text-[14px] pt-4'>Wewnątrz ścian w starszych budynkach zwykle znajduje się ok. 5-centymetrowa pustka powietrzna.</p>
                        </div>
                    </div>

                    <div className='flex w-full flex-row gap-5 items-start pt-2.5 px-[20px]'>
                        <div>
                            <Image src={info.src} height={24} width={24} alt="Info icon" />
                        </div>
                        <div className='flex flex-1 flex-col'>
                            <b>Jaka jest przenikalność cieplna materiałów?</b>
                            <p className='text-[14px] pt-4'>Wartości przenikalności cieplnej wzięte głównie z Polskich Norm są urealnione, czyli ciut wyższe od tego, co znajdziesz np. na opakowaniu styropianu.</p>
                        </div>
                    </div>
                </div>
            </div>
                    <div className='grid md:col-span-2 grid-cols-1 md:grid-cols-2 w-full gap-5'>
                        <div>
                            <CustomLabel label='Okna' />
                            <div className='flex w-full flex-col mt-5 gap-2'>
                                <span>Rodzaj okien</span>
                                <CustomDropdownSelect errors={errors} setErrors={setErrors} formDataValue={'windows_type'} options={windows_type} setFormData={setFormData} formData={formData} placeholder={'wybierz z listy'} />
                            </div>
                            <div className='mt-5 flex flex-col gap-2'>
                                <label>Liczba okien</label>
                                <InputWithPlaceholder errors={errors} setErrors={setErrors} type={'number'} placeholder={'szt.'} formDataValue1={'windows_number'} formDataValue2={false} setFormData={setFormData} formData={formData} />
                            </div>
                            <div className='flex flex-row gap-4 w-full px-2.5 items-center mt-5'>
                                <Image src={info.src} height={22} width={22} className='w-[22px] h-[22px]' alt='alert icon' />
                                <p className='w-full flex-1'>W części ogrzewanej</p>
                            </div>
                            <div className='mt-5 flex flex-col gap-2'>
                                <label>Liczba drzwi balkonowych</label>
                                <InputWithPlaceholder errors={errors} setErrors={setErrors} type={'number'} placeholder={'szt.'} formDataValue1={'taras_doors_number'} formDataValue2={false} setFormData={setFormData} formData={formData} />
                            </div>
                            <div className='mt-5 flex flex-col gap-2'>
                                <label>Liczba dużych przeszkleń</label>
                                <InputWithPlaceholder errors={errors} setErrors={setErrors} type={'number'} placeholder={'szt.'} formDataValue1={'large_glazings_number'} formDataValue2={false} setFormData={setFormData} formData={formData} />
                            </div>
                        </div>
                        <div className='flex flex-col pb-[30px] gap-5 items-start bg-[#F8F8F8] w-full h-fit'>
                            <div className='flex w-full flex-row gap-5 items-start px-[20px] pt-[30px]'>
                                <div>
                                    <Image src={info.src} height={24} width={24} alt="Info icon" />
                                </div>
                                <div className='flex flex-1 flex-col'>
                                    <b>Jak policzyć okna?</b>
                                    <p className='text-[14px] pt-4'>Jako sztukę rozumiemy tu okno o wymiarach <b>140x180cm</b>. Mniejsze okna policz jako pół tej sztuki, większe jako półtora, zsumuj i wpisz poprawną ilość.</p>
                                    <p className='text-[14px] pt-4'>Osobno policz drzwi balkonowe oraz duże przeszklenia. Duże przeszklenie to okno na całą ścianę, tu załóżmy o wymiarach <b>2,5x3m</b>.</p>
                                </div>
                            </div>
                        </div>
                    </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
                <div className='flex flex-col gap-10'>
                    <div>
                        <CustomLabel label='Drzwi' />
                        <div className='flex w-full flex-col mt-5 gap-2'>
                            <span>Rodzaj drzwi zewnętrznych</span>
                            <CustomDropdownSelect errors={errors} setErrors={setErrors} formDataValue={'doors_type'} options={doors_type} setFormData={setFormData} formData={formData} placeholder={'wybierz z listy'} />
                        </div>
                        <div className='flex flex-row gap-5 w-full px-2.5 items-center mt-4'>
                            <Image src={info.src} height={22} width={22} className='w-[22px] h-[22px]' alt='alert icon' />
                            <p className='w-full flex-1'>Jeśli masz starsze i nowsze, wybierz te, których jest najwięcej</p>
                        </div>
                        <div className='mt-5 flex flex-col gap-2'>
                            <label>Liczba drzwi zewnętrznych</label>
                            <InputWithPlaceholder errors={errors} setErrors={setErrors} type={'number'} placeholder={'szt.'} formDataValue1={'outside_doors_number'} formDataValue2={false} setFormData={setFormData} formData={formData} />
                        </div>
                        <div className='flex flex-row gap-5 w-full px-2.5 items-center mt-4'>
                            <Image src={info.src} height={22} width={22} className='w-[22px] h-[22px]' alt='alert icon' />
                            <p className='w-full flex-1'>W części ogrzewanej</p>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col pb-[30px] gap-5 items-start bg-[#F8F8F8] w-full h-fit'>
                    <div className='flex w-full flex-row gap-5 items-start px-[20px] pt-[30px]'>
                        <div>
                            <Image src={info.src} height={24} width={24} alt="Info icon" />
                        </div>
                        <div className='flex flex-1 flex-col'>
                            <b>Jak policzyć drzwi?</b>
                            <p className='text-[14px] pt-4'>Policz wszystkie zewnętrzne drzwi wyjściowe. Nie wliczaj drzwi garażowych ani balkonowych (jeśli są w pełni przeszklone, liczą się do okien jak wyżej).</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SecondStepView2