'use client'

import React, { useEffect, useState } from 'react'
import SuggestedProductThumbnail from '../SuggestedProductThumbnail/SuggestedProductThumbnail'
import { Product } from '@prisma/client'
import { getAllProducts } from '@/utils/supabase/getAllProducts'
import Image from 'next/image'
import loadingIco from '@/assets/svg/loader.svg'

function RaportOverviewWithSuggestion({formData, step, setStep, setFormData}: {formData: any, step: any, setStep: any, setFormData: any}) {
    const [ suggestedProduct, setSuggestedProduct ] = useState<any>(null)
    const [ loading, setLoading ] = useState(true)

    const fetchAllProducts = async () => {
        setLoading(true)
        const returnData: any = await getAllProducts()
        if(returnData.data){
            setSuggestedProduct(returnData.data)
            setFormData({...formData, recommendedProducts: JSON.stringify(returnData.data)})
            setLoading(false)
        }
        else{
            setLoading(false)
            setSuggestedProduct([])
        }
    }

    useEffect(() => {
        if(suggestedProduct == null){
            setLoading(true)
            fetchAllProducts()
        }
    }, [step])
  
    return (
        <div className='flex flex-col gap-20 pb-10'>
            <div className="max-w-[1172px] w-full mx-auto mb-3">
                <div className='text-[32px] md:text-[50px] font-[600] max-w-[800px] leading-[110%]'>Podsumowanie</div>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2'>
                <div className='flex flex-col gap-2.5'>
                    {formData.heat_demand.kW && <div className='flex flex-col xl:flex-row justify-start items-start xl:items-center'>
                        <p className='w-[350px]'>Zapotrzebowanie cieplne budynku</p>
                        <span className='font-bold'>{formData.heat_demand && formData.heat_demand.know ? `${formData.heat_demand.kW} kW` : 'nie znam'}</span>
                    </div>}
                    {formData.heat_demand.temp && <div className='flex flex-col xl:flex-row justify-start items-start xl:items-center'>
                        <p className='w-[350px]'>Projektowa temperatura pomieszczenia</p>
                        <span className='font-bold'>{formData.heat_demand && formData.heat_demand.temp ? `${formData.heat_demand.temp}°C` : 'nie podano'}</span>
                    </div>}
                    <div className='flex flex-col justify-start items-start xl:items-center'>
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
                    {loading ? 
                    <div className='flex items-center w-full md:col-span-3 justify-center py-20'>
                        <Image src={loadingIco.src} height="24" width="24" alt="Loading..." className="animate-spin opacity-30" />
                    </div> : suggestedProduct && suggestedProduct.map((s: any) => {
                        return <SuggestedProductThumbnail suggestedProduct={s} />
                    })}
                </div>
            </div>
        </div>
    )
}

export default RaportOverviewWithSuggestion