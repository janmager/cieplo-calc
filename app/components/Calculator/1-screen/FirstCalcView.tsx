import React from 'react'
import bg from '@/assets/png/bg-image.png'
import CustomDropdownSelect from '../../Customs/CustomDropdownSelect'
import { house_building_years } from '@/app/consts/house_building_years'
import CustomLabel from '../../Customs/CustomLabel'
import NextButton from '../../Customs/NextButton'

function FirstCalcView({formData, setFormData, setViewId}: {formData: any, setFormData: any, setViewId: any}) {
  return (
    <div className='flex flex-col items-center w-full'>
        <div style={{backgroundImage: `url(${bg.src})`, backgroundAttachment: 'fixed', backgroundSize: 'cover',}} className='w-full relative flex items-end justify-center h-[625px]'>
            <div className='max-w-[1172px] text-white flex flex-col gap-8 pb-8 z-20'>
                <h1 className='text-[80px] font-medium leading-[110%]'>Kalkulator doboru<br/>pompy ciepła</h1>
                <h2 className='text-[22px]'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed <b>do eiusmod tempor incididunt</b> ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </h2>
            </div>
            <div className='absolute w-full h-full bg-black opacity-70'></div>
        </div>
        <div className='py-10 w-full max-w-[1172px] grid grid-cols-2 md:grid-cols-2'>
            <div className='flex w-full flex-col gap-4'>
                <CustomLabel label={'Lata budowy domu'} />
                <CustomDropdownSelect formDataValue={'house_building_years'} options={house_building_years} setFormData={setFormData} formData={formData} placeholder={'2027+'} />
            </div>
            <div className='col-span-2 flex justify-end items-end'>
                <NextButton active={true} setViewId={setViewId} nextView={2} />
            </div>
        </div>
    </div>
  )
}

export default FirstCalcView