'use client'

import { deleteCookie, getCookie, setCookie } from 'cookies-next'
import React, { useEffect, useState } from 'react'
import loadingIco from '@/assets/svg/loader.svg'

import statsImg from '@/assets/svg/stats.svg'
import editImg from '@/assets/svg/edit-product.svg'
import logoutImg from '@/assets/svg/logout.svg'
import plusImg from '@/assets/svg/plus.svg'
import raportImg from '@/assets/svg/raport.svg'
import rulerImg from '@/assets/svg/ruler.svg'
import EditProductsView from './EditProductsView';
import AddNewProductView from './AddNewProductView';
import AllRaportsBrowse from './AllRaportsBrowse';
import { Toaster } from 'react-hot-toast'
import EditInstalatorsView from './EditInstalatorsView'
import Image from 'next/image'

const ADMIN_LINKS: any = {
    // 1: {
    //     name: 'Statystyki',
    //     viewId: 1,
    //     icon: statsImg
    // },
    2: {
        name: 'Wszystkie raporty',
        viewId: 2,
        icon: raportImg
    },
    3: {
        name: 'Wszystkie produkty',
        viewId: 3,
        icon: editImg
    },
    // 4: {
    //     name: 'Dodaj nowy produkt',
    //     viewId: 4,
    //     icon: plusImg
    // },
    // 5: {
    //     name: 'Polecani instalatorzy',
    //     viewId: 5,
    //     icon: rulerImg
    // }
}

function AdminContainer() {
    const [ view, setView ] = useState<any>(0)
    
    const logOut = () => {
        deleteCookie('admin');
        window.location.reload();
    }

    useEffect(() => {
        window.scrollTo(0, 0);
        if (window.self !== window.top) {
            // Obiekt wiadomości - możesz go nazwać jak chcesz
            const message = { type: 'scrollToTop' };
                        
            // Adres URL strony WordPressa - kluczowe dla bezpieczeństwa!
            const targetOrigin = 'https://gree.ivn-works.com/'; 

            // Wysłanie wiadomości do rodzica
            window.parent.postMessage(message, targetOrigin);
        }
        view != 0 && setCookie('last-view', view)
    }, [view])

    useEffect(() => {
        const lastView = getCookie('last-view');
        if (typeof lastView === 'string') {
            setView(parseInt(lastView))
        } else{
            setView(2)
        }
    }, [])

    if(view == 0){
        return (
            <div className='flex items-center justify-center py-20'>
                <Image src={loadingIco.src} height="24" width="24" alt="Loading..." className="animate-spin opacity-30" />
            </div>
        )
    }

    return (
        <div className='w-full mb-[-50px]'>
            <Toaster />
            <div className='grid grid-cols-1 lg:grid-cols-4 gap-5 md:gap-10 w-full'>
                <div className='flex flex-col gap-5 md:gap-7'>
                    <span className='text-base font-light opacity-50'>Panel administratora</span>

                    <div className='flex flex-row md:flex-col gap-3'>
                        {Object.keys(ADMIN_LINKS).map((linkId) => {
                            const link = ADMIN_LINKS[linkId];
                            return (
                                <div onClick={() => setView(link.viewId)} key={link.viewId} className={`cursor-pointer font-semibold flex flex-row gap-2 border-2 md:border-t-0 md:border-b-0 md:border-r-0 md:border-l-2 border-[#FF4510] py-4 px-3 w-full items-center justify-center md:justify-start transition-all duration-300 ${view == link.viewId ? 'text-white bg-[#FF4510]' : 'text-[#FF4510] hover:bg-[#FF4510]/10'}`}>
                                    <img src={link.icon.src} style={{filter: link.viewId == view ? 'invert(100%) sepia(100%) brightness(500%)' : ''}} alt="icon" className='w-5 h-5' />
                                    <span className='hidden md:block'>{link.name}</span>
                                </div>
                            )
                        })}
                        <div onClick={() => logOut()}className={`cursor-pointer font-semibold flex flex-row gap-2 border-2 md:border-t-0 md:border-b-0 md:border-r-0 md:border-l-2 border-[#FF4510] py-4 px-3 w-full items-center justify-center md:justify-start transition-all duration-300 text-[#FF4510] hover:bg-[#FF4510]/10`}>
                            <img src={logoutImg.src} alt="icon" className='w-5 h-5' />
                            <span className='hidden md:block'>Wyloguj</span>
                        </div>
                    </div>
                </div>
                <div className='lg:col-span-3 flex flex-col gap-5 rounded'>
                    <h1 className='text-xl font-bold'>{ADMIN_LINKS[view].name}</h1>
                    <div>
                        {/* { view === 1 && <div>1</div> } */}
                        { view === 2 && <AllRaportsBrowse /> }
                        { view === 3 && <EditProductsView /> }
                        { view === 4 && <AddNewProductView /> }
                        { view === 5 && <EditInstalatorsView /> }
                    </div>
                </div>
            </div>
        </div>
    ) 
}

export default AdminContainer