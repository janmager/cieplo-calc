import React, { useEffect, useState } from 'react'
import NextButton from '../../Customs/NextButton'
import SecondStepView0 from './0-step/SecondStepView0'
import SecondStepView1 from './1-step/SecondStepView1'

const steps: any = {
  0: {
    title: 'Obliczanie zapotrzebowania cieplnego budynku',
    desc: 'Etap doboru jest bardzo ważny. Podane informacje będą miały wpływ na późniejszą pracę urządzenia.',
    breadcrumbTitle: 'Rodzaj budynku',
  },
  1: {
    title: 'Wymiary',
    desc: 'Etap doboru jest bardzo ważny. Podane informacje będą miały wpływ na późniejszą pracę urządzenia.',
    breadcrumbTitle: 'Wymiary',
  },
  2: {
    title: 'Ściany',
    desc: 'Etap doboru jest bardzo ważny. Podane informacje będą miały wpływ na późniejszą pracę urządzenia.',
    breadcrumbTitle: 'Ściany',
  },
  3: {
    title: 'Poddasze i parter',
    desc: 'Etap doboru jest bardzo ważny. Podane informacje będą miały wpływ na późniejszą pracę urządzenia.',
    breadcrumbTitle: 'Poddasze i parter',
  },
  4: {
    title: 'Ogrzewanie budynku',
    desc: 'Etap doboru jest bardzo ważny. Podane informacje będą miały wpływ na późniejszą pracę urządzenia.',
    breadcrumbTitle: 'Ogrzewanie',
  },
  5: {
    title: 'Podsumowanie',
    desc: false,
    breadcrumbTitle: 'Wynik',
  },
}

function SecondCalcView({formData, setFormData,setViewId}: {formData: any, setViewId: any, setFormData: any}) {
  const [ step, setStep ] = useState(0)
  const [ validButton, setValidButton ] = useState(false)

  useEffect(() => {
    if(step == 0){
      if(formData.building_type) setValidButton(true) 
      else setValidButton(false)
    }
  }, [formData])

  useEffect(() => {
    setValidButton(false)
  }, [step])

  return (
    <div className='flex flex-col'>
      {/* breadcrumbs */}
      <div className='h-[165px] w-full flex items-center justify-center bg-[#F5F5F5]'>
        <div className='flex cursor-default flex-row gap-1.5 md:gap-2.5 lg:gap-4 xl:gap-5 text-[13px] lg:text-[15px] items-center mt-[62px] justify-center'>
        {
          Object.keys(steps).map((item: any, idx) => {
            return (
              <>
                <span className={`${item == step ? 'font-bold text-[#FF4510] text-center' : 'hidden md:block'}`}>{steps[item].breadcrumbTitle}</span>
                {item != step && <span className={`rounded-full border ${parseInt(item) < step ? 'bg-[#FF4510] border-[#FF4510] text-white' : 'border-[#CACACA] text-gray-600'} font-[600] w-[28px] h-[28px] flex items-center justify-center md:hidden`}>{parseInt(item)+1}</span>}
                {item < Object.keys(steps).length-1 && <div className='h-[1px] w-[10px] md:w-[30px] lg:w-[55px] bg-[#CACACA]'></div>}
              </>
            )
          })
        }
        </div>
      </div>
      {/* dynamic box */}
      <div className="max-w-[1172px] px-5 w-full mx-auto mt-10 mb-3">
        <div className='text-[32px] md:text-[50px] font-[600] max-w-[800px] leading-[110%]'>{steps[step].title}</div>
        <div className='text-[20px] md:text-[30px] leading-[36px] font-[400] mt-5 md:mt-10 max-w-[900px]'>{steps[step].desc}</div>
      </div>
      {/* user interactive zone */}
      <div className='max-w-[1172px] px-5 w-full mx-auto mt-10 mb-5'>
        {/* step 0 */}
        {step == 0 && <SecondStepView0 formData={formData} setFormData={setFormData} />}
        {/* step 0 */}
        {step == 1 && <SecondStepView1 formData={formData} setFormData={setFormData} />}
      </div>
      <div className='max-w-[1172px] px-5 mt-10 w-full flex mb-5 justify-end mx-auto'>
        <NextButton active={validButton} setViewId={setStep} nextView={step+1} />
      </div>
    </div>
  )
}

export default SecondCalcView