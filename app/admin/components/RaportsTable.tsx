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
import ShowRaportDetailsAdminModal from './ShowRaportDetailsAdminModal'

export const SuggestedProductListItem = ({item}: {item: any}) => {
    return (
        <div className='flex flex-row justify-between pb-1.5 pt-1.5 items-center gap-5'>
            <a target='_blank' href={item.product.product_link} className='flex items-center flex-col gap-0'>
                <span className='text-[12px] font-[500]'>{item.product.desc}</span>
                <span className='text-[10px] min-w-[55px] text-center opacity-60'>{item.product.type}</span>
            </a>
        </div>
    )
}

function RaportsTable({raports, fetchAllRaports}: {raports: Raport[], fetchAllRaports: any}) {
    const [ showConfirm, setShowConfirm ] = useState<any>(false)
    const [ loading, setLoading ] = useState(false)
    const [ currentDetailsRaport, setCurrentDetailsRaport ] = useState<any>(null)
    const [ showDetails, setShowDetails ] = useState(false)

    const confirmDelete = (raport: any) => {
        setShowConfirm(raport)
    }

    const findRaport = (id: string) => {
        const find = raports.find((item: any) => item.id === id)
        return find
    }

    const handleShowDetails = (id: string) => {
        setShowDetails(true);
        let find = findRaport(id)
        setCurrentDetailsRaport(find)
    }

    const sendRaportToMail = async (raport: any) => {
        if(loading) return false;
        setLoading(true)

        try {
            const response = await fetch('/api/mail/raport/send', {
                method: 'post',
                body: JSON.stringify({email: raport.contact_email_address, raportId: raport.id})
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
                <div className='w-full min-w-[150px] max-w-[150px] border-r px-4 '>
                    ID
                </div>
                <div className="w-full max-w-[300px] min-w-[300px] pl-4 pr-0">
                    Sugerowane produkty
                </div>
                <div className="w-full pl-4 border-l">
                    Klient
                </div>
                <div className="w-full min-w-[200px] max-w-[200px] px-4">
                    
                </div>
            </div>

            {/* content */}
            <div className='md:border-0 flex flex-col gap-2.5 md:gap-0 w-full'>
            {
                raports.map((raport: any) => {
                    return (
                        <div key={raport.id} className='min-h-[49px] flex border-t md:border-t-0 w-full text-xs md:flex-row overflow-x-auto flex-col border-b border-l border-r py-2'>
                            <div className='w-full md:min-w-[150px] text-[11px] md:max-w-[150px] flex-col px-4 md:border-r flex items-start gap-1'>
                                <span className='text-[12px] font-[600]'>{(raport.human_id)}</span>
                                <span className='opacity-75'>{new Date(raport.created_at).toLocaleString('pl-PL', {day: 'numeric', month: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric'})}</span>
                            </div>
                            <div className='pl-4 gap-5 max-md:py-3 pr-2 flex w-full overflow-x-auto md:min-w-[300px] md:max-w-[300px] max-md:border-t max-md:border-b border-gray-100 items-center max-md:mt-4 justify-start'>
                                {(raport.recommendedProducts && JSON.parse(raport.recommendedProducts).length) ? 
                                JSON.parse(raport.recommendedProducts).map((item: any, i: number) => {
                                    return (
                                        <div className={`${i+1!=JSON.parse(raport.recommendedProducts).length ? 'md:border-r' : ''} pr-4 hover:underline`}>
                                            <SuggestedProductListItem item={item} />    
                                        </div>
                                    )
                                }) : <div><span className='text-[11px] font-[500] opacity-30'>brak poleceń produktów</span></div>}
                            </div>
                            {(raport.contact_email_address || raport.contact_phone_number) ? <div className='col-span-2 max-md:pl-4 justify-start md:border-l text-left pt-4 md:pt-0 w-full pr-2 pl-3 border-r flex truncate items-center overflow-auto'>
                                <span className='truncate leading-[160%] w-full max-md:pb-4 max-md:border-b border-gray-100'>{raport.contact_email_address}<br/>{raport.contact_phone_number && raport.contact_phone_number.length > 0 ? `tel: ${raport.contact_phone_number }`: ''}</span>
                            </div> : <div className='col-span-2 max-md:pl-4 max-md:border-b md:border-l border-gray-100 md:border-gray-200 max-md:pb-4 justify-start text-left pt-4 md:pt-0 w-full pr-2 pl-3 border-r flex truncate items-center overflow-auto'>
                                <span className='text-[11px] font-[500] opacity-30'>brak informacji kontaktowych</span>    
                            </div>}
                            <div className='w-full md:w-fit col-span-2 min-w-[220px] md:col-span-1 flex justify-between mt-2.5 md:mt-0 flex-row gap-3 lg:justify-end md:pl-0 pr-3 lg:items-center'>
                                <div className='flex flex-row gap-3'>
                                    <span onClick={() => handleShowDetails(raport.id)} className='text-[11px] h-full items-center flex border-r pr-3 ml-4 md:ml-3 opacity-70 hover:opacity-100 cursor-pointer'>Szczegóły</span>
                                    <Link target='_blank' href={`/wynik/${raport.id}`} className='text-[11px] h-full items-center flex opacity-70 hover:opacity-100 border-r pr-3'>Otwórz</Link>
                                </div>
                                <div className='flex flex-row gap-3'>
                                    {loading ? '' : <Image onClick={() => sendRaportToMail(raport)} src={sendIcon.src} height={19} width={19} alt="Send icon" className='opacity-20 hover:opacity-80 transition-all duration-300 hover:cursor-pointer grayscale hover:grayscale-0' />}
                                    {/* <Image onClick={() => confirmDelete(raport)} src={trashIcon.src} height={19} width={19} alt="Trash icon" className='opacity-30 hover:opacity-80 transition-all duration-300 hover:cursor-pointer grayscale hover:grayscale-0' /> */}
                                </div>
                            </div>
                        </div>
                    )
                })
            }
            </div>
            {showConfirm && <ConfirmModal title='Czy na pewno chcesz usunąć raport?' desc='Raport zostanie trwale usunięty.' yesButtonText='Tak' noButtonText='Nie' onClose={() => setShowConfirm(false)} onConfirm={() => deleteRaport()} />}
            {showDetails && <ShowRaportDetailsAdminModal visible={showDetails} setVisible={setShowDetails} data={currentDetailsRaport} />}
        </div>
    )
}

export default RaportsTable