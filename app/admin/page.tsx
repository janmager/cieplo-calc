'use client'

import React, { useEffect, useState } from 'react'
import AdminContainer from './components/AdminContainer'
import AdminLoginContainer from './components/AdminLoginContainer'
import { getCookie } from 'cookies-next'
import { checkAdminPass } from '@/utils/supabase/checkAdminPass'
import Image from 'next/image'
import loadingIco from '@/assets/svg/loader.svg'

function page() {
    const [ admin, setAdmin ] = useState(false)
    const [ loading, setLoading ] = useState(true)

    const checkAdminPassLocal = async (pass: any) => {
        let checkSecure = await checkAdminPass(pass)
        if(checkSecure.response){
            setAdmin(true)
            setLoading(false)
        }
        else{
            setAdmin(false)
            setLoading(false)
        } 
        
    }

    useEffect(() => {
        let pass: any = getCookie('admin');
        if(pass && pass.length > 2){
            checkAdminPassLocal(pass)
        }else{
            setLoading(false)
        }
    }, [])

    if(loading){
        return (
            <div className='flex items-center justify-center pt-52 pb-40'>
                <Image src={loadingIco.src} height="24" width="24" alt="Loading..." className="animate-spin opacity-30" />
            </div>
        )
    }

    return (
        <div className='pt-20 md:pt-32 pb-20 w-full'>
            {
                admin ? 
                <AdminContainer /> : 
                <AdminLoginContainer />
            }
        </div>
    )
}

export default page