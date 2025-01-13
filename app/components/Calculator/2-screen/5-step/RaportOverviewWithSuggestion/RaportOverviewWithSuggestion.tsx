import React from 'react'
import SuggestedProductThumbnail from '../SuggestedProductThumbnail/SuggestedProductThumbnail'
import { Product } from '@prisma/client'

const suggestedProductTemp: Product = {
    id: '1',
    name: 'Pompa Ciepła Versati All in One',
    desc: 'GRS-CQ4.0PdG/NhH2-E(I)',
    params: '',
    image: 'https://s3-alpha-sig.figma.com/img/12dd/d6bf/938660aca9957ffba5a33f8d1b8cfc78?Expires=1737331200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=VDJfl~CXc6pSHX7cbvsfbV74yXdN91Y7ZMbyRQTHh6Qa2G7Mtx47vwY3fhH4qONJeE6cgVM7MrE3wGQoEwN3-vtCGc6gMCbi6o2fQ2ZwQZXcdllhwIW06lVRD0ta7hrwc7r8iCHuTXSFyss0OFQQtPJso1xMRnAJCWC1cUzU~780qBY7yjU7mCUR1FD9w3p84aXJ4sS8bubm68bV8ZjvdizpQGJPrLA9e7dD1AKX3QUrQEVMOHJ~w1GupXIqX7~0U~m7rzQB2fGzXOhCoeUZ2bgeRn4bumZvleiwjUz2rYLGpUCzcMf~844gzC~tZ~Sns35IBAKg7irV-JfaIXOGcA__',
}

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
                    <span className='font-bold'>{formData.heat_demand && formData.heat_demand.know ? `${formData.heat_demand.kW} kW` : 'nie znam'}</span>
                </div>
                <div className='flex flex-col xl:flex-row justify-start items-start xl:items-center'>
                    <p className='w-[350px]'>Projektowa temperatura pomieszczenia</p>
                    <span className='font-bold'>{formData.heat_demand && formData.heat_demand.temp ? `${formData.heat_demand.temp}°C` : 'nie podano'}</span>
                </div>
                <div className='flex flex-col xl:flex-row justify-start items-start xl:items-center'>
                    <p className='w-[350px]'>Lokalizacja budynku</p>
                    <span className='font-bold'>{formData.house_location['full_name']}</span>
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
                <SuggestedProductThumbnail suggestedProduct={suggestedProductTemp} />
                <SuggestedProductThumbnail suggestedProduct={suggestedProductTemp} />
                <SuggestedProductThumbnail suggestedProduct={suggestedProductTemp} />
            </div>
        </div>
    </div>
  )
}

export default RaportOverviewWithSuggestion