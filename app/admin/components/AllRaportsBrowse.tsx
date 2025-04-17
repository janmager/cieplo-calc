'use client'

import { getAllProducts } from '@/utils/supabase/getAllProducts';
import React, { useEffect, useState } from 'react'
import ProductsTable from './ProductsTable';
import Image from 'next/image';
import loadingIco from '@/assets/svg/loader.svg'
import RaportsTable from './RaportsTable';
import { getAllRaports } from '@/utils/supabase/getAllRaports';
import downloadExcelFile from '@/utils/globals/downloadExcelData';

function AllRaportsBrowse() {
    const [ raports, setRaports ] = useState<any>(null)
    const [ loading, setLoading ] = useState(false)
    const [ error, setError ] = useState<any>(null)
    const [ excelRaports, setExcelRaports ] = useState<any>(null);

    const convertExcelFileData = (data: any) => {
        let out: any = []

        data.map((singleRaport: any, idx: number) => {
            out.push({
                'ID': singleRaport.id,
                'Data utworzenia': new Date(singleRaport.created_at).toLocaleString('pl-PL', {day: 'numeric', month: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric'}),
                'Zgoda na kontakt' : singleRaport.send_raport_accept_24h.indexOf('Tak') >= 0 ? 'Tak' : 'Nie',
                'Email kontaktowy': singleRaport.contact_email_address,
                'Numer telefonu' : singleRaport.contact_phone_number,
                'Zapotrzebowanie cieplne' : `${(Number(singleRaport.api_max_heating_power) + Number(singleRaport.api_hot_water_power ? singleRaport.api_hot_water_power : 0)).toFixed(2)} kW`,
                'Sugerowany Monoblok' : JSON.parse(singleRaport.recommendedProducts) && JSON.parse(singleRaport.recommendedProducts)[0] ? `${JSON.parse(singleRaport.recommendedProducts)[0].productName}\n${JSON.parse(singleRaport.recommendedProducts)[0].product.name}\nodchylenie od pkt biwa: ${JSON.parse(singleRaport.recommendedProducts)[0].range ? Number(JSON.parse(singleRaport.recommendedProducts)[0].range).toFixed(2) : '-'}°C` : '-',
                'Sugerowany Split' :  JSON.parse(singleRaport.recommendedProducts) && JSON.parse(singleRaport.recommendedProducts)[1] ? `${JSON.parse(singleRaport.recommendedProducts)[1].productName}\n${JSON.parse(singleRaport.recommendedProducts)[1].product.name}\nodchylenie od pkt biwa: ${JSON.parse(singleRaport.recommendedProducts)[1].range ? Number(JSON.parse(singleRaport.recommendedProducts)[1].range).toFixed(2) : '-'}°C` : '-',
                'Sugerowany All-In-One' :  JSON.parse(singleRaport.recommendedProducts) && JSON.parse(singleRaport.recommendedProducts)[2] ? `${JSON.parse(singleRaport.recommendedProducts)[2].productName}\n${JSON.parse(singleRaport.recommendedProducts)[2].product.name}\nodchylenie od pkt biwa: ${JSON.parse(singleRaport.recommendedProducts)[2].range ? Number(JSON.parse(singleRaport.recommendedProducts)[2].range).toFixed(2) : '-'}°C` : '-',
                'Link do raportu' : { f: `HYPERLINK("${window.location.origin}/wynik/${singleRaport.id}"; "otwórz raport")` },
            })
        })

        setExcelRaports(out)
    }

    const fetchAllRaports = async () => {
        setLoading(true)
        let raportsResponse: any = await getAllRaports()
        if(raportsResponse.response){
            convertExcelFileData(JSON.parse(raportsResponse.data))
            setRaports(JSON.parse(raportsResponse.data))
            setLoading(false)
        }
        else{
            setError('Wystąpił błąd podczas pobierania raportów.')
            setLoading(false)
        } 
    }

    useEffect(() => {
        if(raports == null && !loading){
            fetchAllRaports()
        }
    }, [])

    if(loading){
        return (
            <div className='flex items-center justify-center py-20'>
                <Image src={loadingIco.src} height="24" width="24" alt="Loading..." className="animate-spin opacity-30" />
            </div>
        )
    }

    return (
        <div>
            <div className='rounded-lg flex flex-row items-center px-7 py-1.5 mb-4 text-xs mt-[-8px] hover:bg-[#FF4510] hover:text-white group cursor-pointer transition-all duration-300 border border-[#FF4510] text-[#FF4510] w-fit' onClick={() => downloadExcelFile(excelRaports)}> 
                Pobierz raport <img src="/xls-orange.svg" height={17} width={17} className='ml-1.5 transition-all group-hover:hidden'/><img src="/xls-white.svg" height={17} width={17} className='ml-1.5 hidden group-hover:block transition-all'/>
            </div>
            <div>
                {
                    (error || raports == null) ? 
                    <div className='pt-20 pb-28 flex items-center text-sm justify-center opacity-50'>
                        {error}
                    </div> : 
                    raports.length == 0 ? 
                    <div className='pt-20 pb-28 flex items-center text-sm justify-center opacity-50'>
                        Brak raportów w bazie danych
                    </div> :
                    <RaportsTable fetchAllRaports={fetchAllRaports} raports={raports} />
                }
            </div>
        </div>
    )
}

export default AllRaportsBrowse