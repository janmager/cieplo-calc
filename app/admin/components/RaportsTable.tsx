import { cutStartAndEndString } from '@/utils/globals/cutStartAndEndString'
import { Product, Raport } from '@prisma/client'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import trashIcon from '@/assets/svg/trash-icon.svg'
import sendIcon from '@/assets/svg/mail.svg'
import ConfirmModal from '@/app/components/Customs/ConfirmModal'
import toast from 'react-hot-toast'
import { deleteRaportFromDb } from '@/utils/supabase/deleteRaportFromDb'
import loadingIco from '@/assets/svg/loader.svg'

function RaportsTable({raports, fetchAllRaports}: {raports: Raport[], fetchAllRaports: any}) {
    const [ showConfirm, setShowConfirm ] = useState<any>(false)
    const [ loading, setLoading ] = useState(false)

    const confirmDelete = (raport: any) => {
        setShowConfirm(raport)
    }

    const sendRaportToMail = async (raport: any) => {
        if(loading) return false;
        setLoading(true)

        try {
            const response = await fetch('/api/mail/raport/send', {
                method: 'post',
                body: JSON.stringify({email: raport.send_raport_email, raportId: raport.id})
            });

            if (!response.ok) {
                throw new Error(`response status: ${response.status}`);
            }
            const responseData = await response.json();
    
            toast.success('Poprawnie wysłano raport do klienta')
            await fetchAllRaports()
            setShowConfirm(false);
            setLoading(false)
        }
        catch(e){
            console.log(e);
            toast.error('Wystąpił błąd podczas wysyłania raportu do klienta');
            setShowConfirm(false);
            setLoading(false)
        }
    }
    
    const deleteRaport = async () => {
        if(loading) return false;
        setLoading(true)
        const del = await deleteRaportFromDb(showConfirm.id);

        if(del.response){
            toast.success('Usunięto poprawnie raport')
            await fetchAllRaports()
            setShowConfirm(false);
            setLoading(false)
        }
        else{
            toast.error('Wystąpił błąd podczas usuwania raportu');
            setShowConfirm(false);
            setLoading(false)
        }
    }

    if(loading){
        return (
            <div className='flex items-center justify-center py-20'>
                <Image src={loadingIco.src} height="24" width="24" alt="Loading..." className="animate-spin opacity-30" />
            </div>
        )
    }

    return (
        <div className='text-[14px]'>
            {/* header */}
            <div className='hidden md:flex flex-row flex-nowrap border py-2 font-bold'>
                <div className='w-full min-w-[120px] max-w-[120px] border-r px-4'>
                    ID
                </div>
                <div className='w-full min-w-[170px] max-w-[170px] border-r px-4'>
                    Utworzono
                </div>
                <div className="w-full px-4">
                    Klient
                </div>
                <div className="w-full min-w-[200px] max-w-[200px] px-4">
                    
                </div>
            </div>

            {/* content */}
            <div className='md:border-0 flex flex-col gap-2.5 md:gap-0 w-full'>
            {
                raports.map((raport) => {
                    return (
                        <div key={raport.id} className='grid grid-cols-2 md:flex border-t md:border-t-0 w-full text-[11px] flex-row flex-wrap md:flex-nowrap border-b border-l border-r py-2'>
                            <div className='w-full md:min-w-[120px] md:max-w-[120px] px-4 border-r flex items-center'>
                                {cutStartAndEndString(raport.id, 5)}
                            </div>
                            <div className='pl-4 pr-0 md:pr-4 md:border-r flex w-full min-w-[170px] max-w-[170px] items-center justify-end md:justify-start'>
                                {new Date(raport.created_at).toLocaleString('pl-PL', {day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric'})}
                            </div>
                            <div className='col-span-2 text-center justify-center md:justify-start md:text-left pt-4 md:pt-0 w-full px-4 border-r flex truncate items-center overflow-auto'>
                                {raport.send_raport_email}{raport.contact_phone_number && raport.contact_phone_number.length > 0 ? `, tel: ${raport.contact_phone_number }`: ''}
                            </div>
                            <div className='w-full md:w-fit col-span-2 min-w-[240px] md:col-span-1 flex justify-center mt-5 md:mt-0 flex-row gap-3 lg:justify-end pl-5 pr-3 lg:items-end'>
                                <span className='text-[11px] border-r pr-5 ml-5 opacity-70 hover:opacity-100 cursor-pointer'>Szczegóły</span>
                                <Link target='_blank' href={`/wynik/${raport.id}`} className='text-[11px] opacity-70 hover:opacity-100 border-r pr-5'>Otwórz</Link>
                                {loading ? '' : <Image onClick={() => sendRaportToMail(raport)} src={sendIcon.src} height={19} width={19} alt="Send icon" className='opacity-20 hover:opacity-80 transition-all duration-300 hover:cursor-pointer grayscale hover:grayscale-0' />}
                                <Image onClick={() => confirmDelete(raport)} src={trashIcon.src} height={19} width={19} alt="Trash icon" className='opacity-30 hover:opacity-80 transition-all duration-300 hover:cursor-pointer grayscale hover:grayscale-0' />
                            </div>
                        </div>
                    )
                })
            }
            </div>
            {showConfirm && <ConfirmModal title='Czy na pewno chcesz usunąć raport?' desc='Raport zostanie trwale usunięty.' yesButtonText='Tak' noButtonText='Nie' onClose={() => setShowConfirm(false)} onConfirm={() => deleteRaport()} />}
        </div>
    )
}

export default RaportsTable