'use client'

import { Instalators, Product } from '@prisma/client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import trashIcon from '@/assets/svg/trash-icon.svg'
import ConfirmModal from '@/app/components/Customs/ConfirmModal'
import toast from 'react-hot-toast'
import loadingIco from '@/assets/svg/loader.svg'
import { deleteInstalatorFromDb } from '@/utils/supabase/deleteInstalatorFromDb'
import AddNewInstalatorModal from './AddNewInstalatorModal'
import editIco from '@/assets/svg/pencil.svg'
import { deleteProductFromDb } from '@/utils/supabase/deleteProductFromDb copy'
import ShowRaportDetailsAdminModal from './ShowRaportDetailsAdminModal'
import DetailsProductModal from '@/app/components/Customs/DetailsProductModal'
import AddNewProductView from './AddNewProductView'

function ProductsTable({products, fetchAllProducts}: {products: Product[], fetchAllProducts: any}) {
    const [ showConfirm, setShowConfirm ] = useState<any>(false)
    const [ loading, setLoading ] = useState(false)
    const [ currentDetails, setCurrentDetails ] = useState<Product | null>(null)
    const [ showDetails, setShowDetails ] = useState(false)
    const [ showAddNewProduct, setShowAddNewProduct ] = useState(false)

    const confirmDelete = (raport: any) => {
        setShowConfirm(raport)
    }

    const addNewProductTrigger = () => {
        setShowAddNewProduct(true)
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

    const handleProductInfoModal = (product: any) => {
        setShowDetails(true);
        setCurrentDetails(product)
    }

    if(showAddNewProduct){
        return (
            <div>
                <AddNewProductView />
            </div>
        )
    }

    return (
        <div className='text-[14px] mt-[-10px]'>
            <div onClick={() => addNewProductTrigger()} className='border border-[#FF4510] hover:text-white hover:bg-[#FF4510] transition-all duration-200 cursor-pointer inline-flex rounded-lg mb-3 px-4 py-1 text-[#FF4510]'>
                + nowy produkt
            </div>
            {/* header */}
            <div className='hidden md:flex flex-row flex-nowrap border py-2 font-bold'>
                <div className='w-full border-r px-4 min-w-[300px] max-w-[300px]'>
                    Nazwa
                </div>
                <div className="w-full min-w-[150px] max-w-[150px] border-r px-4">
                    Typ
                </div>
                <div className="w-full min-w-[100px] max-w-[100px] border-r px-4">
                    Model
                </div>
                <div className="w-full min-w-[200px] max-w-[200px] border-r-0 px-4">
                    Parametry
                </div>
                <div className="w-full px-4 min-w-[100px] max-w-[100px]">
                    
                </div>
            </div>

            {/* content */}
            <div className='md:border-0 w-full flex flex-col gap-2.5 md:gap-0'>
            {
                products.map((product) => {
                    return (
                        <div key={product.id} className='flex border-t md:border-t-0 w-full text-xs flex-row flex-wrap md:flex-nowrap border-b border-l border-r py-2'>
                            <div className='md:col-span-3 px-4  md:border-r flex w-full min-w-[300px] max-w-[300px] items-center'>
                                <span className="max-w-[290px] truncate line-clamp-1">{product.name}</span>
                            </div>
                            <div className='w-full min-w-[150px] max-w-[150px] px-4 md:border-r flex truncate items-center overflow-auto'>
                                {product.type}
                            </div>
                            <div className='w-full min-w-[100px] max-w-[100px] px-4 md:border-r flex truncate items-center overflow-auto'>
                                {product.desc}
                            </div>
                            <div className='w-full min-w-[200px] max-w-[200px] px-4 md:border-r-0 flex truncate items-center overflow-auto'>
                                <span className="text-[11px] underline cursor-pointer" onClick={() => handleProductInfoModal(product)}>zobacz szczegóły</span>
                            </div>
                            <div className='w-full col-span-2 md:col-span-1 flex justify-center flex-row gap-4 mt-2 md:mt-0 lg:justify-end pl-5 pr-3 lg:items-center'>
                                <Image onClick={() => confirmDelete(product)} src={trashIcon.src} height={19} width={19} alt="Trash icon" className='opacity-30 hover:opacity-80 transition-all duration-300 hover:cursor-pointer grayscale hover:grayscale-0' />
                            </div>
                        </div>
                    )
                })
            }
            </div>
            {showConfirm && <ConfirmModal title='Czy na pewno chcesz usunąć produkt?' desc='Produkt zostanie trwale usunięty.' yesButtonText='Tak' noButtonText='Nie' onClose={() => setShowConfirm(false)} onConfirm={() => deleteProduct()} />}
            {showDetails && <DetailsProductModal fetchAllProducts={fetchAllProducts} product={currentDetails} show={showDetails} setShow={setShowDetails} />}
        </div>
    )
}

export default ProductsTable