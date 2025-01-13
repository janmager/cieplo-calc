import { Instalators } from '@prisma/client'
import Image from 'next/image'
import React, { useState } from 'react'
import trashIcon from '@/assets/svg/trash-icon.svg'
import ConfirmModal from '@/app/components/Customs/ConfirmModal'
import toast from 'react-hot-toast'
import loadingIco from '@/assets/svg/loader.svg'
import { deleteInstalatorFromDb } from '@/utils/supabase/deleteInstalatorFromDb'
import AddNewInstalatorModal from './AddNewInstalatorModal'
import editIco from '@/assets/svg/pencil.svg'

function InstalatorsTable({instalators, fetchAllInstalators}: {instalators: Instalators[], fetchAllInstalators: any}) {
    const [ showConfirm, setShowConfirm ] = useState<any>(false)
    const [ loading, setLoading ] = useState(false)
    const [ editInstalatorMode, setEditInstalatorMode ] = useState<any>(false)
    const [ currentEditingId, setCurrentEditingId ] = useState<any>(null)

    const editInstalator = (id: any) => {
        setCurrentEditingId(id)
        setEditInstalatorMode(true)
    }

    const hideModalEdit = () => {
        setCurrentEditingId(null)
        setEditInstalatorMode(false)
    }

    const confirmDelete = (raport: any) => {
        setShowConfirm(raport)
    }
    
    const deleteInstalator = async () => {
        if(loading) return false;
        setLoading(true)
        const del = await deleteInstalatorFromDb(showConfirm.id);

        if(del.response){
            toast.success('Usunięto poprawnie instalatora')
            await fetchAllInstalators()
            setShowConfirm(false);
            setLoading(false)
        }
        else{
            toast.error('Wystąpił błąd podczas usuwania instalatora');
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
                <div className='w-full min-w-[260px] max-w-[260px] border-r px-4'>
                    Nazwa
                </div>
                <div className="w-full min-w-[130px] max-w-[130px] border-r px-4">
                    Telefon
                </div>
                <div className="w-full px-4">
                    Adres
                </div>
                <div className="w-full px-4 min-w-[100px] max-w-[100px]">
                    
                </div>
            </div>

            {/* content */}
            <div className='md:border-0 w-full flex flex-col gap-2.5 md:gap-0'>
            {
                instalators.map((instalator) => {
                    return (
                        <div key={instalator.id} className='flex border-t md:border-t-0 w-full text-[11px] flex-row flex-wrap md:flex-nowrap border-b border-l border-r py-2'>
                            <div className='md:col-span-3 px-4 md:border-r flex w-full min-w-[260px] max-w-[260px] items-center'>
                                {instalator.name}
                            </div>
                            <div className='w-full min-w-[130px] max-w-[130px] px-4 md:border-r flex truncate items-center overflow-auto'>
                                {instalator.phone}
                            </div>
                            <div className='w-full px-4 md:border-r flex truncate items-center overflow-auto'>
                                {instalator.postalAndCity}
                            </div>
                            <div className='w-full min-w-[85px] max-w-[85px] col-span-2 md:col-span-1 flex justify-center flex-row gap-4 mt-2 md:mt-0 lg:justify-end pl-5 pr-3 lg:items-center'>
                                <Image onClick={() => editInstalator(instalator.id)} src={editIco.src} height={19} width={19} alt="Edit icon" className='opacity-20 hover:opacity-80 transition-all duration-300 hover:cursor-pointer grayscale hover:grayscale-0' />
                                <Image onClick={() => confirmDelete(instalator)} src={trashIcon.src} height={19} width={19} alt="Trash icon" className='opacity-30 hover:opacity-80 transition-all duration-300 hover:cursor-pointer grayscale hover:grayscale-0' />
                            </div>
                        </div>
                    )
                })
            }
            </div>
            {showConfirm && <ConfirmModal title='Czy na pewno chcesz usunąć dane instalatora?' desc='Instalator zostanie trwale usunięty.' yesButtonText='Tak' noButtonText='Nie' onClose={() => setShowConfirm(false)} onConfirm={() => deleteInstalator()} />}
            {editInstalatorMode && <AddNewInstalatorModal hideModal={hideModalEdit} fetchAllInstalators={fetchAllInstalators} edit={{on: true, id: currentEditingId}} />}
        </div>
    )
}

export default InstalatorsTable