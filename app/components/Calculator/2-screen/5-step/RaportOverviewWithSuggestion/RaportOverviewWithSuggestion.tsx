'use client'

import React, { useEffect, useState } from 'react'
import SuggestedProductThumbnail from '../SuggestedProductThumbnail/SuggestedProductThumbnail'
import { Product } from '@prisma/client'
import { getAllProducts } from '@/utils/supabase/getAllProducts'
import Image from 'next/image'
import loadingIco from '@/assets/svg/loader.svg'

function RaportOverviewWithSuggestion({formData, step, products, loadingUpper, setStep, setFormData, handleCountCieploAPI, suggestedProducts}: {formData: any, loadingUpper: boolean, step: any, products: any, setStep: any, setFormData: any, handleCountCieploAPI: any, suggestedProducts: any}) {

    useEffect(() => {
        if(!loadingUpper && products.length > 0 && suggestedProducts == null){
            console.log('go on from raport view')
            handleCountCieploAPI()
        } 
    }, [products])
  
    return (
        <div className='flex flex-col gap-10 pb-10'>
            <div className="max-w-[1172px] w-full mx-auto mb-3">
                <div className='text-[32px] md:text-[50px] font-[600] max-w-[800px] leading-[110%]'>Podsumowanie</div>
            </div>
            <div className='grid grid-cols-1'>
                <div className='flex flex-col gap-2.5'>
                    {formData.heat_demand.kW && <div className='flex flex-col justify-start items-start'>
                        <p className='w-[350px]'>Zapotrzebowanie cieplne budynku</p>
                        <span className='font-bold'>{formData.heat_demand && formData.heat_demand.know ? `${formData.heat_demand.kW} kW` : `${Number(formData.api_max_heating_power).toFixed(2)} kW`}</span>
                    </div>}
                    {formData.heat_demand.temp && <div className='fflex flex-col justify-start items-start'>
                        <p className='w-[350px]'>Projektowa temperatura pomieszczenia</p>
                        <span className='font-bold'>{formData.heat_demand && formData.heat_demand.temp ? `${formData.heat_demand.temp}°C` : 'nie podano'}</span>
                    </div>}
                    <div className='flex flex-col justify-start items-start'>
                        <p className='w-[350px]'>Lokalizacja budynku</p>
                        <span className='font-bold'>{formData.house_location['full_name']}</span>
                    </div>
                </div>
                {
                    suggestedProducts == null && 
                    <div className='flex items-center mt-10 justify-start'>
                        <div>

                            <div onClick={() => loadingUpper ? null : handleCountCieploAPI()} className={`border font-bold text-[14px] md:text-[16px] border-[#FF4510] px-5 h-[50px] text-[#FF4510] hover:text-white hover:cursor-pointer hover:bg-[#FF4510] uppercase flex items-center justify-center ${loadingUpper ? 'opacity-50 grayscale' : ''}`}>
                                <span>{loadingUpper ? 'Ładowanie...' : 'Sprawdź proponowane produkty'}</span>
                            </div>
                        </div>
                    </div>
                }
            </div>

            {suggestedProducts != null &&
            <div>
                <span className='text-[30px] tracking-tighter font-bold text-[#FF4510]'>Sugerowane urządzenia do Twojego budynku</span>
                <div className={`mt-5 grid grid-cols-1 ${suggestedProducts.length == 3 ? 'md:grid-cols-3' : suggestedProducts.length == 2 ? 'md:grid-cols-2' : ''} gap-10`}>
                    {
                        suggestedProducts.map((product: any) => {
                            let productObj = product.product;

                            return (
                                <div key={productObj.id} className="border px-5 pt-0 pb-10 flex flex-col gap-0 items-center justify-center">
                                    <img src={`${productObj.image}`} alt={productObj.desc} className='w-full' />
                                    <div className='flex flex-col gap-1 items-center justify-center text-center'>
                                        <span className="uppercase text-[#FF4510] font-[600] text-xs">{productObj.type}</span>
                                        <span className="text-2xl tracking-tight font-[700]">{productObj.name}</span>
                                        <span className='text-sm font-[400] text-gray-500'>{productObj.desc}</span>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>}

            {suggestedProducts != null && 
            <div className="w-full">
                <div onClick={() => loadingUpper ? null : setStep(step + 1)} className={`border font-bold border-[#FF4510] h-[70px] text-[#FF4510] hover:text-white hover:cursor-pointer hover:bg-[#FF4510] uppercase flex items-center justify-center ${loadingUpper ? 'opacity-50 grayscale' : ''}`}>
                    <span>{loadingUpper ? 'Ładowanie...' : 'Zapisz raport'}</span>
                </div>
            </div>}
        </div>
    )
}

export default RaportOverviewWithSuggestion