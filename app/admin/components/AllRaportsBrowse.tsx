'use client'

import { getAllProducts } from '@/utils/supabase/getAllProducts';
import React, { useEffect, useState } from 'react'
import ProductsTable from './ProductsTable';
import Image from 'next/image';
import loadingIco from '@/assets/svg/loader.svg'
import RaportsTable from './RaportsTable';
import { getAllRaports } from '@/utils/supabase/getAllRaports';

function AllRaportsBrowse() {
    const [ raports, setRaports ] = useState<any>(null)
    const [ loading, setLoading ] = useState(false)
    const [ error, setError ] = useState<any>(null)

    const fetchAllRaports = async () => {
        setLoading(true)
        let raportsResponse = await getAllRaports()
        if(raportsResponse.response){
            setRaports(raportsResponse.data)
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