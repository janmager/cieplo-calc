'use client'

import React, { useEffect, useState } from 'react'
import SuggestedProductThumbnail from '../SuggestedProductThumbnail/SuggestedProductThumbnail'
import { Product } from '@prisma/client'
import { getAllProducts } from '@/utils/supabase/getAllProducts'
import Image from 'next/image'
import loadingIco from '@/assets/svg/loader.svg'
import TooMuchkWInfo from '@/app/admin/components/TooMuchkWInfo'

function RaportOverviewWithSuggestion({formData, step, products, loadingUpper, setStep, setFormData, handleCountCieploAPI, suggestedProducts}: {formData: any, loadingUpper: boolean, step: any, products: any, setStep: any, setFormData: any, handleCountCieploAPI: any, suggestedProducts: any}) {

    useEffect(() => {
        if(!loadingUpper && products.length > 0 && suggestedProducts == null){
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
                    {(formData.heat_demand.kW || formData.api_max_heating_power) && <div className='flex flex-col justify-start items-start'>
                        <p className='w-[350px]'>{formData.api_max_heating_power ? 'Wyliczone z' : 'Z'}apotrzebowanie cieplne budynku</p>
                        <span className='font-bold'>{formData.heat_demand && formData.heat_demand.know ? `${formData.heat_demand.kW} kW` : `${(Number(formData.api_max_heating_power) + (formData.api_hot_water_power ? Number(formData.api_hot_water_power) : 0)).toFixed(2)} kW`}</span>
                    </div>}
                    {formData.temp_in_heat_rooms && <div className='fflex flex-col justify-start items-start'>
                        <p className='w-[350px]'>Projektowa temperatura pomieszczenia</p>
                        <span className='font-bold'>{formData.heat_demand && formData.temp_in_heat_rooms ? `${formData.temp_in_heat_rooms}°C` : 'nie podano'}</span>
                    </div>}
                    <div className='flex flex-col justify-start items-start'>
                        <p className='w-[350px]'>Lokalizacja budynku</p>
                        <span className='font-bold'>{formData.house_location['full_name']}</span>
                    </div>
                </div>
            </div>

            {suggestedProducts != null ?
            <div>
                <span className='text-[30px] tracking-tighter font-bold text-[#FF4510]'>Sugerowane urządzenia do Twojego budynku</span>
                <div className={`mt-5 grid grid-cols-1 md:grid-cols-3 gap-10`}>
                    {
                        suggestedProducts.length ? suggestedProducts.map((product: any) => {
                            let productObj = product.product;

                            return (
                                <div key={productObj.id} className="border px-5 pt-0 pb-10 flex flex-col gap-0 items-center justify-center">
                                    <img src={`${productObj.image}`} alt={productObj.desc} className='w-full' />
                                    <div className='flex flex-col gap-1 items-center justify-center text-center'>
                                        <span className="uppercase text-[#FF4510] font-[600] text-xs">{productObj.type}</span>
                                        <span className="text-2xl tracking-tight font-[700] line-clamp-2">{productObj.name}</span>
                                        <span className='text-sm font-[400] text-gray-500'>{productObj.desc}</span>
                                    </div>
                                    {productObj.product_link && <a target='_blank' href={productObj.product_link} className='bg-[#FF4510] product-link hideOnPrint mt-7 flex items-center justify-center h-[54px] w-full uppercase text-white font-[700]'>
                                        <span className='text-center text-[14px] md:text-[14px]'>ZOBACZ KARTĘ PRODUKTU</span>
                                    </a>}
                                </div>
                            )
                        }) : <TooMuchkWInfo />
                    }
                </div>
            </div> : 
            <div className='flex justify-center w-full items-center py-20'>          
                <Image src={loadingIco.src} height={24} width={24} className='animate-spin opacity-30' alt='loader' />
            </div>}

            {suggestedProducts != null && 
            <div className="w-full">
                <div onClick={() => loadingUpper ? null : setStep(step + 1)} className={`border font-bold border-[#FF4510] h-[70px] text-[#FF4510] hover:text-white hover:cursor-pointer hover:bg-[#FF4510] uppercase flex items-center justify-center ${loadingUpper ? 'opacity-50 grayscale' : ''}`}>
                    <span>{loadingUpper ? 'Ładowanie...' : 'Przejdź do pełnego raportu'}</span>
                </div>
            </div>}
        </div>
    )
}

export default RaportOverviewWithSuggestion