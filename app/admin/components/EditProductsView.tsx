'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import loadingIco from '@/assets/svg/loader.svg'
import InstalatorsTable from './InstalatorsTable';
import AddNewInstalatorModal from './AddNewInstalatorModal';
import ProductsTable from './ProductsTable';
import { getAllProducts } from '@/utils/supabase/getAllProducts';

function EditProductsView() {
    const [ products, setProducts ] = useState<any>(null)
    const [ loading, setLoading ] = useState(false)
    const [ error, setError ] = useState<any>(null)


    const fetchAllProducts = async () => {
        setLoading(true)
        let productsResponse = await getAllProducts()
        if(productsResponse.response){
            setProducts(productsResponse.data)
            setLoading(false)
        }
        else{
            setError('Wystąpił błąd podczas pobierania listy produktów.')
            setLoading(false)
        } 
    }

    useEffect(() => {
        if(products == null && !loading){
            fetchAllProducts()
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
                    (error || products == null) ? 
                    <div className='pt-20 pb-28 flex items-center text-sm justify-center opacity-50'>
                        {error}
                    </div> : 
                    products.length == 0 ? 
                    <div className='pt-20 pb-28 flex items-center text-sm justify-center opacity-50'>
                        Brak produktów w bazie danych
                    </div> :
                    <ProductsTable products={products} fetchAllProducts={fetchAllProducts} />
                }
            </div>
        </div>
    )
}

export default EditProductsView