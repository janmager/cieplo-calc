import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import xIcon from '@/assets/svg/x-black.svg'
import DetailedRaportAdmin from './DetailedRaportAdmin'
import { useReactToPrint } from 'react-to-print'
import loadingIcon from '@/assets/svg/loader.svg'
import { set } from 'ol/transform'

function ShowRaportDetailsAdminModal({visible, setVisible, data, automaticDownload = false}:{visible: boolean, setVisible: any, data: any, automaticDownload?: boolean}) {
    const contentRef = useRef<any>(null)
    const [ loading, setLoading ] = useState(false)

    const reactToPrintFn = useReactToPrint({ 
        contentRef,
        onBeforePrint: async () => {
            document.title = `Raport-${data.id}`;
        },
    });

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 400)
        setTimeout(() => {
            automaticDownload && reactToPrintFn();
        }, 500)
    }, [])

    if(visible) return (
        <div className='fixed top-0 z-[100] left-0 w-dvw h-dvh flex items-center justify-center'>
            { loading ? 
            <div className='flex items-center bg-white z-[101] min-w-[320px] rounded-lg justify-center py-20'>
                <Image src={loadingIcon.src} height="24" width="24" alt="Loading..." className="animate-spin opacity-30" />
            </div>
            :
            <div className='bg-white gap-4 md:gap-8 relative z-[101] h-[90%] w-full max-w-[95%] md:max-w-[1440px] md:w-[80%] p-5 md:p-10 rounded flex flex-col'>
                <div className='flex flex-col gap-1'>
                    <h1 className='text-[24px] font-bold'>Raport wyceny</h1>
                    <span className='font-[500] mt-2'><span className='opacity-75 font-normal'>z dnia</span> {new Date(data.created_at).toLocaleString('pl-PL', {day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric'})}</span>
                    <span className='font-[500]'><span className='opacity-75 font-normal'>Identyfikator: </span> {data.id}</span>
                </div>
                <div ref={contentRef} className='differentOnPrint flex-1 mt-2 noTopMargin md:mt-5 max-w-[700px] bg-gray-50 shadow border py-10 px-5 md:px-8 w-full mx-auto rounded-lg overflow-y-auto'>
                    <DetailedRaportAdmin data={data} />
                </div>
                <div className='flex flex-col gap-2.5 mt-2 md:mt-5'>
                    <div onClick={() => loading ? null : reactToPrintFn()} className='bg-[#FF4510] text-lg text-white py-5 px-10 rounded flex items-center justify-center text-center cursor-pointer font-semibold'>Wydrukuj / Zapisz .PDF</div>
                    <div onClick={() => setVisible(false)} className='bg-transparent text-lg text-gray-500 py-2.5 px-10 hover:text-gray-600 rounded flex border border-gray-300 hover:bg-gray-100 transition-all duration-300 items-center justify-center text-center cursor-pointer font-medium'>Zamknij</div>
                </div>
                <Image src={xIcon.src} alt="close icon" height={20} width={20} className='absolute top-[20px] opacity-50 hover:opacity-100 transition-all duration-300 right-[20px] cursor-pointer' onClick={() => setVisible(false)} />
            </div>}
            <div className='bg-black/90 w-full h-full left-0 top-0 absolute' style={{backdropFilter: 'blur(3px)'}} onClick={() => loading ? null : setVisible(false)}></div>
        </div>
    )
}

export default ShowRaportDetailsAdminModal