import CustomLabel from '@/app/components/Customs/CustomLabel'
import React from 'react'
import info from '@/assets/svg/info-icon.svg'
import Image from 'next/image'
import CustomRadioInput from '@/app/components/Customs/CustomRadioInput'
import { building_outline } from '@/app/consts/building_outline'
import InputWithPlaceholder from '@/app/components/Customs/InputWithPlaceholder'

import check from '@/assets/svg/check-orange.svg'
import regularInsideOutline from '@/assets/outlines/regular-inside.svg'
import regularOutsideOutline from '@/assets/outlines/regular-outline.svg'
import regularMoreOutline from '@/assets/outlines/regular-more.svg'
import inregularOutline from '@/assets/outlines/inregular-outline.svg'
import CustomDropdownSelect from '@/app/components/Customs/CustomDropdownSelect'
import { building_floor_plan } from '@/app/consts/building_floor_plan'
import { building_roof_plan } from '@/app/consts/building_roof_plan'
import { building_outline_sizes } from '@/app/consts/building_outline_sizes'
import building_outline_img from '@/assets/jpg/powierzchnia-zabudowy.jpg'
import ChooseHeatingLeveles from './ChooseHeatingLeveles'
import DynamicHouseSketch from './DynamicHouseSketch'
import { house_levels_height } from '@/app/consts/house_levels_height'
import { house_garage } from '@/app/consts/house_garage'

function SecondStepView1({formData, setFormData, errors, setErrors}: {formData: any, setFormData: any, errors: any, setErrors: any}) {
  return (
    <div className='flex flex-col gap-14 w-full'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
            <div>
                <CustomLabel label='Obrys budynku' />
                <div className='flex flex-col gap-[14px] mt-[22px]'>
                    {
                        building_outline.map((item: any, idx: number) => {
                            return (
                                <CustomRadioInput errors={errors} setErrors={setErrors} setFormData={setFormData} formData={formData} item={item} name='building_outline' key={idx} />
                            )
                        })
                    }
                </div>
                {formData.building_outline == 'Nieregularny (wszelkie inne kształty)' && 
                <div>
                    <div className='flex flex-row gap-5 w-full px-2.5 items-start mt-5'>
                        <Image src={info.src} height={22} width={22} className='w-[22px] h-[22px]' alt='alert icon' />
                        <p className='w-full flex-1 mt-[-5px]'>W tym przypadku musisz ręcznie policzyć pole obrysu budynku (w projekcie pod nazwą <b>powierzchnia zabudowy</b>) oraz jego obwód.</p>
                    </div>
                    <div className='mt-5'>
                        <div className='mt-2.5 flex flex-col gap-2'>
                            <label>Powierzchnia zabudowy</label>
                            <InputWithPlaceholder errors={errors} setErrors={setErrors} type={'number'} placeholder={'mkw.'} formDataValue1={'building_area'} formDataValue2={false} setFormData={setFormData} formData={formData} />
                        </div>
                        <div className='flex flex-row gap-5 w-full px-2.5 items-start mt-5'>
                            <Image src={info.src} height={22} width={22} className='w-[22px] h-[22px]' alt='alert icon' />
                            <p className='w-full flex-1 mt-[-5px]'><b>Powierzchnię zabudowy</b> znajdziesz w projekcie budynku pod dokładnie taką nazwą: <b>powierzchnia zabudowy</b>.</p>
                        </div>
                        <div className='mt-4 flex flex-col gap-2'>
                            <label>Obwód budynku</label>
                            <InputWithPlaceholder errors={errors} setErrors={setErrors} type={'number'} placeholder={'m'} formDataValue1={'building_outline_m'} formDataValue2={false} setFormData={setFormData} formData={formData} />
                        </div>
                    </div>
                </div>}
                {
                    formData.building_outline == 'Regularny – prostokątny' &&
                    <div className='mt-5'>
                        <CustomLabel label='Wymiary obrysu budynku' />
                        <div className='flex flex-col gap-[14px] mt-[22px]'>
                            {
                                building_outline_sizes.map((item: any, idx: number) => {
                                    return (
                                        <CustomRadioInput errors={errors} setErrors={setErrors} setFormData={setFormData} formData={formData} item={item} name='building_outline_sizes' key={idx} />
                                    )
                                })
                            }
                        </div>
                        {
                            formData.building_outline_sizes == 'Znam wymiary zewnętrzne budynku' &&
                            <div className='mt-5'>
                                <div className='mt-2.5 flex flex-col gap-2'>
                                    <label>Długość obrysu budynku</label>
                                    <InputWithPlaceholder errors={errors} setErrors={setErrors} type={'number'} placeholder={'m'} formDataValue1={'building_outline_length_m'} formDataValue2={false} setFormData={setFormData} formData={formData} />
                                </div>
                                <div className='mt-2.5 flex flex-col gap-2'>
                                    <label>Szerokość obrysu budynku</label>
                                    <InputWithPlaceholder errors={errors} setErrors={setErrors} type={'number'} placeholder={'m'} formDataValue1={'building_outline_width_m'} formDataValue2={false} setFormData={setFormData} formData={formData} />
                                </div>
                            </div>
                        }
                        {
                            formData.building_outline_sizes == 'Znam powierzchnię zabudowy' &&
                            <div className='mt-5'>
                                <div className='mt-2.5 flex flex-col gap-2'>
                                    <label>Powierzchnia zabudowy</label>
                                    <InputWithPlaceholder errors={errors} setErrors={setErrors} type={'number'} placeholder={'mkw.'} formDataValue1={'building_area'} formDataValue2={false} setFormData={setFormData} formData={formData} />
                                </div>
                                <div className='flex flex-row gap-5 w-full px-2.5 items-start mt-5'>
                                    <Image src={info.src} height={22} width={22} className='w-[22px] h-[22px]' alt='alert icon' />
                                    <p className='w-full flex-1 mt-[-5px]'><b>Powierzchnię zabudowy</b> znajdziesz w projekcie budynku pod dokładnie taką nazwą: <b>powierzchnia zabudowy</b>.</p>
                                </div>
                            </div>
                        }
                    </div>
                }
                {
                    formData.building_outline == 'Znam powierzchnię zabudowy' &&
                    <div className='mt-2.5 flex flex-col gap-2'>
                        <label>Powierzchnia zabudowy</label>
                        <InputWithPlaceholder errors={errors} setErrors={setErrors} type={'number'} placeholder={'mkw.'} formDataValue1={'building_area'} formDataValue2={false} setFormData={setFormData} formData={formData} />
                    </div>
                }
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
                <div className='flex w-full flex-row gap-5 items-start bg-[#F8F8F8] p-[20px]'>
                    <div>
                        <Image src={info.src} height={24} width={24} alt="Info icon" />
                    </div>
                    <div className='flex flex-1 flex-col'>
                        <b>Co to jest powierzchnia zabudowy?</b>
                        <p className='text-[14px] mt-2.5'>To powierzchnia gruntu zajmowana przez budynek.</p>
                        <Image className='mx-auto mt-5' src={building_outline_img.src} alt="powierzchnia zabudowy img" height="200" width="150" />
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
                    <CustomDropdownSelect errors={errors} setErrors={setErrors} formDataValue={'house_floor_plan'} options={building_floor_plan} setFormData={setFormData} formData={formData} placeholder={'wybierz z listy'} />
                </div>
                <div className='flex w-full flex-col mt-5 gap-2'>
                    <span>Dach jest</span>
                    <CustomDropdownSelect errors={errors} setErrors={setErrors} formDataValue={'house_roof_plan'} options={building_roof_plan} setFormData={setFormData} formData={formData} placeholder={'wybierz z listy'} />
                </div>
                <p className='mt-5 text-[14px]'><b>Dach skośny bez poddasza</b> dotyczy sytuacji gdy bezpośrednio pod ten dach nie da się wejść wcale lub tylko na czworaka (np. gdy na pierwotnie płaskim dachu dobudowano dach skośny najprościej jak się dało).</p>
                <p className='mt-2.5 text-[14px]'><b>Dach skośny z poddaszem</b> to każda inna sytuacja gdy bezpośrednio pod dachem istnieje prawie pełnowymiarowa kondygnacja (zamieszkała lub nie).</p>
                <div className='flex flex-row gap-5 cursor-pointer mt-7 items-center' onClick={() => setFormData({...formData, 'building_has_basement': !formData['building_has_basement'] })}>
                    <div className='min-w-[20px] max-w-[20px] min-h-[20px] max-h-[20px] border border-[#8E8E8E] flex items-center justify-center'>
                        {formData['building_has_basement'] && <Image src={check.src} height={17} width={17} className='opacity-100' alt="check" />}
                    </div>
                    <span>Dom jest podpiwniczony</span>
                </div>
                <div className='flex w-full flex-col mt-7 gap-2'>
                    <span>Które piętra są ogrzewane? <span className='text-xs opacity-50 font-light'>{formData.heating_levels.length == 0 ? '(wybierz minimun jedną opcję)' : ''}</span></span>
                    <ChooseHeatingLeveles formData={formData} setFormData={setFormData} /> 
                </div>
                <div className='flex w-full flex-col mt-5 gap-2'>
                    <span>Wysokość pięter</span>
                    <CustomDropdownSelect errors={errors} setErrors={setErrors} formDataValue={'house_levels_height'} options={house_levels_height} setFormData={setFormData} formData={formData} placeholder={'wybierz z listy'} />
                </div>
                <div className='flex flex-row gap-5 cursor-pointer mt-5 items-center' onClick={() => setFormData({...formData, 'building_has_taras': !formData['building_has_taras'] })}>
                    <div className='min-w-[20px] max-w-[20px] min-h-[20px] max-h-[20px] border border-[#8E8E8E] flex items-center justify-center'>
                        {formData['building_has_taras'] && <Image src={check.src} height={17} width={17} className='opacity-100' alt="check" />}
                    </div>
                    <span>Dom ma balkon(y)</span>
                </div>
                <div className='flex w-full flex-col mt-5 gap-2'>
                    <span>Garaż w bryle budynku</span>
                    <CustomDropdownSelect errors={errors} setErrors={setErrors} formDataValue={'house_garage'} options={house_garage} setFormData={setFormData} formData={formData} placeholder={'wybierz z listy'} />
                </div>
            </div>
            <div className='h-full flex flex-col gap-5 items-start w-full'>
                <div className='flex w-full flex-row gap-5 items-start bg-[#F8F8F8] p-[20px]'>
                    <div>
                        <Image src={info.src} height={24} width={24} alt="Info icon" />
                    </div>
                    <div className='flex flex-1 flex-col'>
                        <b>Podgląd sytuacji</b>
                        <DynamicHouseSketch formData={formData} setFormData={setFormData} />
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default SecondStepView1