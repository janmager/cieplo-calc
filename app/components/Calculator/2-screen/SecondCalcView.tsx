import React, { useState } from 'react'

const steps: any = {
  0: {
    title: 'Obliczanie zapotrzebowania cieplnego budynku',
    desc: 'Etap doboru jest bardzo ważny. Podane informacje będą miały wpływ na późniejszą pracę urządzenia.',
    breadcrumbTitle: 'Rodzaj budynku',
  }
}

function SecondCalcView({formData, setFormData,setViewId}: {formData: any, setViewId: any, setFormData: any}) {
  const [ step, setStep ] = useState(0)

  return (
    <div className='flex flex-col'>
      {/* breadcrumbs */}
      <div className='h-[165px] w-full bg-[#F5F5F5]'>

      </div>
      {/* dynamic box */}
      <div className="max-w-[1172px] px-5 w-full mx-auto mt-10">
        <div className='text-[32px] md:text-[50px] font-[600] max-w-[800px] leading-[110%]'>{steps[step].title}</div>
        <div className='text-[20px] md:text-[30px] leading-[36px] font-[400] mt-5 md:mt-10 max-w-[900px]'>{steps[step].desc}</div>
      </div>
      <div className='max-w-[1172px] px-5 w-full mx-auto mt-10 bg-black h-[300px] mb-5'>

      </div>
    </div>
  )
}

export default SecondCalcView