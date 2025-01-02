import React from 'react'
import SuggestedProductThumbnail from '../SuggestedProductThumbnail/SuggestedProductThumbnail'

function RaportOverviewWithSuggestion({formData, step, setStep, setFormData}: {formData: any, step: any, setStep: any, setFormData: any}) {
  return (
    <div className='flex flex-col gap-20 pb-10'>
        <div className="max-w-[1172px] w-full mx-auto mb-3">
            <div className='text-[32px] md:text-[50px] font-[600] max-w-[800px] leading-[110%]'>Podsumowanie</div>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2'>
            <div className='flex flex-col gap-2.5'>
                <div className='flex flex-col xl:flex-row justify-start items-start xl:items-center'>
                    <p className='w-[350px]'>Zapotrzebowanie cieplne budynku</p>
                    <span className='font-bold'>12,34 kW</span>
                </div>
                <div className='flex flex-col xl:flex-row justify-start items-start xl:items-center'>
                    <p className='w-[350px]'>Projektowa temperatura pomieszczenia</p>
                    <span className='font-bold'>20 °C</span>
                </div>
                <div className='flex flex-col xl:flex-row justify-start items-start xl:items-center'>
                    <p className='w-[350px]'>Lokalizacja budynku</p>
                    <span className='font-bold'>Kraków</span>
                </div>
            </div>
            <div className='flex items-center justify-center'>
                <div onClick={() => setStep(step + 1)} className='border font-bold border-[#FF4510] w-[110px] h-[50px] text-[#FF4510] hover:text-white hover:cursor-pointer hover:bg-[#FF4510] uppercase flex items-center justify-center'>
                    <span>dalej</span>
                </div>
            </div>
        </div>

        <div>
            <span className='text-[30px] font-bold text-[#FF4510]'>Sugerowane urządzenia do Twojego budynku</span>
            <div className='mt-5 grid grid-cols-1 md:grid-cols-3 gap-10'>
                <SuggestedProductThumbnail />
                <SuggestedProductThumbnail />
                <SuggestedProductThumbnail />
            </div>
        </div>
    </div>
  )
}

export default RaportOverviewWithSuggestion