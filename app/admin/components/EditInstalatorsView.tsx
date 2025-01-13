'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import loadingIco from '@/assets/svg/loader.svg'
import { getAllInstalators } from '@/utils/supabase/getAllInstalators';
import InstalatorsTable from './InstalatorsTable';
import AddNewInstalatorModal from './AddNewInstalatorModal';

function EditInstalatorsView() {
    const [ instalators, setInstalators ] = useState<any>(null)
    const [ loading, setLoading ] = useState(false)
    const [ error, setError ] = useState<any>(null)


    const fetchAllInstalators = async () => {
        setLoading(true)
        let productsResponse = await getAllInstalators()
        if(productsResponse.response){
            setInstalators(productsResponse.data)
            setLoading(false)
        }
        else{
            setError('Wystąpił błąd podczas pobierania listy instalatorów.')
            setLoading(false)
        } 
    }

    useEffect(() => {
        if(instalators == null && !loading){
            fetchAllInstalators()
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
                    (error || instalators == null) ? 
                    <div className='pt-20 pb-28 flex items-center text-sm justify-center opacity-50'>
                        {error}
                    </div> : 
                    instalators.length == 0 ? 
                    <div className='pt-20 pb-28 flex items-center text-sm justify-center opacity-50'>
                        Brak instalatorów w bazie danych
                    </div> :
                    <InstalatorsTable instalators={instalators} fetchAllInstalators={fetchAllInstalators} />
                }
            </div>
            <div>
                <AddNewInstalatorModal fetchAllInstalators={fetchAllInstalators} />
            </div>
        </div>
    )
}

export default EditInstalatorsView