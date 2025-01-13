import { Instalators, Product } from '@prisma/client'
import Image from 'next/image'
import React, { useState } from 'react'
import trashIcon from '@/assets/svg/trash-icon.svg'
import ConfirmModal from '@/app/components/Customs/ConfirmModal'
import toast from 'react-hot-toast'
import loadingIco from '@/assets/svg/loader.svg'
import { deleteInstalatorFromDb } from '@/utils/supabase/deleteInstalatorFromDb'
import AddNewInstalatorModal from './AddNewInstalatorModal'
import editIco from '@/assets/svg/pencil.svg'
import { deleteProductFromDb } from '@/utils/supabase/deleteProductFromDb copy'

function ProductsTable({products, fetchAllProducts}: {products: Product[], fetchAllProducts: any}) {
    const [ showConfirm, setShowConfirm ] = useState<any>(false)
    const [ loading, setLoading ] = useState(false)
    const [ editProductMode, setEditProductMode ] = useState<any>(false)
    const [ currentEditingId, setCurrentEditingId ] = useState<any>(null)

    const editProduct = (id: any) => {
        setCurrentEditingId(id)
        setEditProductMode(true)
    }

    const hideModalEdit = () => {
        setCurrentEditingId(null)
        setEditProductMode(false)
    }

    const confirmDelete = (raport: any) => {
        setShowConfirm(raport)
    }
    
    const deleteProduct = async () => {
        if(loading) return false;
        setLoading(true)
        const del = await deleteProductFromDb(showConfirm.id);

        if(del.response){
            toast.success('Usunięto poprawnie produkt')
            await fetchAllProducts()
            setShowConfirm(false);
            setLoading(false)
        }
        else{
            toast.error('Wystąpił błąd podczas usuwania produktu');
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
                <div className="w-full min-w-[200px] max-w-[200px] border-r px-4">
                    Model
                </div>
                <div className="w-full px-4 min-w-[100px] max-w-[100px]">
                    
                </div>
            </div>

            {/* content */}
            <div className='md:border-0 w-full flex flex-col gap-2.5 md:gap-0'>
            {
                products.map((product) => {
                    return (
                        <div key={product.id} className='flex border-t md:border-t-0 w-full text-[11px] flex-row flex-wrap md:flex-nowrap border-b border-l border-r py-2'>
                            <div className='md:col-span-3 px-4 md:border-r flex w-full min-w-[260px] max-w-[260px] items-center'>
                                {product.name}
                            </div>
                            <div className='w-full min-w-[200px] max-w-[200px] px-4 md:border-r flex truncate items-center overflow-auto'>
                                {product.desc}
                            </div>
                            <div className='w-full col-span-2 md:col-span-1 flex justify-center flex-row gap-4 mt-2 md:mt-0 lg:justify-end pl-5 pr-3 lg:items-center'>
                                <Image onClick={() => editProduct(product.id)} src={editIco.src} height={19} width={19} alt="Edit icon" className='opacity-20 hover:opacity-80 transition-all duration-300 hover:cursor-pointer grayscale hover:grayscale-0' />
                                <Image onClick={() => confirmDelete(product)} src={trashIcon.src} height={19} width={19} alt="Trash icon" className='opacity-30 hover:opacity-80 transition-all duration-300 hover:cursor-pointer grayscale hover:grayscale-0' />
                            </div>
                        </div>
                    )
                })
            }
            </div>
            {showConfirm && <ConfirmModal title='Czy na pewno chcesz usunąć produkt?' desc='Produkt zostanie trwale usunięty.' yesButtonText='Tak' noButtonText='Nie' onClose={() => setShowConfirm(false)} onConfirm={() => deleteProduct()} />}
            {editProductMode && <AddNewInstalatorModal hideModal={hideModalEdit} fetchAllInstalators={fetchAllProducts} edit={{on: true, id: currentEditingId}} />}
        </div>
    )
}

export default ProductsTable