'use client'

import { saveProduct } from '@/utils/supabase/saveProduct';
import { Product } from '@prisma/client'
import React, { useState } from 'react'

function DetailsProductModal({product, show, setShow}: {product: Product | null, show: boolean, setShow: any}) {
    const [ tempProduct, setTempProduct ] = useState<Product | null>(product || null)
    const [ loading, setLoading ] = useState(false);
    const [ error, setError ] = useState('')

    const saveNewValues = async () => {
        if(loading && tempProduct) return false;

        setLoading(true);
        try{

            const edit = await saveProduct(tempProduct as Product)
            if(edit.response){
                setShow(false)
            }
            else return false;
        }
        catch(e){
            console.error(e)
            setError('error during adding :(')
            setLoading(false);
        }
    }

  
    if(show && tempProduct != null) return (
        <div className='fixed top-0 left-0 z-50 w-dvw h-dvh flex items-center justify-center'>
            <div className='z-40 bg-white p-10 flex items-center flex-col rounded-lg text-gray-800'>
                <span className="text-sm text-gray-400 font-[400]">{tempProduct.type}</span>
                <span className="text-xl font-[600]">{tempProduct.name}</span>
                <span className="font-[400] text-gray-500">{tempProduct.desc}</span>

                <table className="admin-edit-table mt-5 mb-3">
                    <tr>
                        <td colSpan={12} className='py-4 text-xs font-[600] text-gray-800'>Wydajność grzewcza {tempProduct.name} {tempProduct.desc}</td>
                    </tr>
                    <tr>
                        <td rowSpan={2} className='py-2 px-4 text-xs font-[600]'>Temperatura<br/>zasilania [°C]</td>
                        <td colSpan={10} className='py-2 text-xs font-[600]'>Temperatura zewnętrzna [°C]</td>
                    </tr>
                    <tr>
                        <td className='nr'>-25</td>
                        <td className='nr'>-20</td>
                        <td className='nr'>-15</td>
                        <td className='nr'>-10</td>
                        <td className='nr'>-7</td>
                        <td className='nr'>-2</td>
                        <td className='nr'>2</td>
                        <td className='nr'>7</td>
                        <td className='nr'>10</td>
                        <td className='nr'>15</td>
                    </tr>
                    <tr>
                        <td className='py-1 rid'>25</td>
                        <td className="answ"><input onChange={(e) => setTempProduct({...tempProduct, p25_minus25: Number(e.target.value)})} value={tempProduct.p25_minus25 ? Number(tempProduct.p25_minus25) : ''} type="number" /></td>
                        <td className="answ"><input onChange={(e) => setTempProduct({...tempProduct, p25_minus20: Number(e.target.value)})} value={tempProduct.p25_minus20 ? Number(tempProduct.p25_minus20) : ''} type="number" /></td>
                        <td className="answ"><input onChange={(e) => setTempProduct({...tempProduct, p25_minus15: Number(e.target.value)})} value={tempProduct.p25_minus15 ? Number(tempProduct.p25_minus15) : ''} type="number" /></td>
                        <td className="answ"><input onChange={(e) => setTempProduct({...tempProduct, p25_minus10: Number(e.target.value)})} value={tempProduct.p25_minus10 ? Number(tempProduct.p25_minus10) : ''} type="number" /></td>
                        <td className="answ"><input onChange={(e) => setTempProduct({...tempProduct, p25_minus7: Number(e.target.value)})} value={tempProduct.p25_minus7 ? Number(tempProduct.p25_minus7) : ''} type="number" /></td>
                        <td className="answ"><input onChange={(e) => setTempProduct({...tempProduct, p25_minus2: Number(e.target.value)})} value={tempProduct.p25_minus2 ? Number(tempProduct.p25_minus2) : ''} type="number" /></td>
                        <td className="answ"><input onChange={(e) => setTempProduct({...tempProduct, p25_plus2: Number(e.target.value)})} value={tempProduct.p25_plus2 ? Number(tempProduct.p25_plus2) : ''} type="number" /></td>
                        <td className="answ"><input onChange={(e) => setTempProduct({...tempProduct, p25_plus7: Number(e.target.value)})} value={tempProduct.p25_plus7 ? Number(tempProduct.p25_plus7) : ''} type="number" /></td>
                        <td className="answ"><input onChange={(e) => setTempProduct({...tempProduct, p25_plus10: Number(e.target.value)})} value={tempProduct.p25_plus10 ? Number(tempProduct.p25_plus10) : ''} type="number" /></td>
                        <td className="answ"><input onChange={(e) => setTempProduct({...tempProduct, p25_plus15: Number(e.target.value)})} value={tempProduct.p25_plus15 ? Number(tempProduct.p25_plus15) : ''} type="number" /></td>
                    </tr>
                    <tr>
                        <td className='py-1 rid'>30</td>
                        <td className="answ"><input onChange={(e) => setTempProduct({...tempProduct, p30_minus25: Number(e.target.value)})} value={tempProduct.p30_minus25 ? Number(tempProduct.p30_minus25) : ''} type="number" /></td>
                        <td className="answ"><input onChange={(e) => setTempProduct({...tempProduct, p30_minus20: Number(e.target.value)})} value={tempProduct.p30_minus20 ? Number(tempProduct.p30_minus20) : ''} type="number" /></td>
                        <td className="answ"><input onChange={(e) => setTempProduct({...tempProduct, p30_minus15: Number(e.target.value)})} value={tempProduct.p30_minus15 ? Number(tempProduct.p30_minus15) : ''} type="number" /></td>
                        <td className="answ"><input onChange={(e) => setTempProduct({...tempProduct, p30_minus10: Number(e.target.value)})} value={tempProduct.p30_minus10 ? Number(tempProduct.p30_minus10) : ''} type="number" /></td>
                        <td className="answ"><input onChange={(e) => setTempProduct({...tempProduct, p30_minus7: Number(e.target.value)})} value={tempProduct.p30_minus7 ? Number(tempProduct.p30_minus7) : ''} type="number" /></td>
                        <td className="answ"><input onChange={(e) => setTempProduct({...tempProduct, p30_minus2: Number(e.target.value)})} value={tempProduct.p30_minus2 ? Number(tempProduct.p30_minus2) : ''} type="number" /></td>
                        <td className="answ"><input onChange={(e) => setTempProduct({...tempProduct, p30_plus2: Number(e.target.value)})} value={tempProduct.p30_plus2 ? Number(tempProduct.p30_plus2) : ''} type="number" /></td>
                        <td className="answ"><input onChange={(e) => setTempProduct({...tempProduct, p30_plus7: Number(e.target.value)})} value={tempProduct.p30_plus7 ? Number(tempProduct.p30_plus7) : ''} type="number" /></td>
                        <td className="answ"><input onChange={(e) => setTempProduct({...tempProduct, p30_plus10: Number(e.target.value)})} value={tempProduct.p30_plus10 ? Number(tempProduct.p30_plus10) : ''} type="number" /></td>
                        <td className="answ"><input onChange={(e) => setTempProduct({...tempProduct, p30_plus15: Number(e.target.value)})} value={tempProduct.p30_plus15 ? Number(tempProduct.p30_plus15) : ''} type="number" /></td>
                    </tr>
                    <tr>
                        <td className='py-1 rid'>35</td>
                        <td className="answ"><input onChange={(e) => setTempProduct({...tempProduct, p35_minus25: Number(e.target.value)})} value={tempProduct.p35_minus25 ? Number(tempProduct.p35_minus25) : ''} type="number" /></td>
                        <td className="answ"><input onChange={(e) => setTempProduct({...tempProduct, p35_minus20: Number(e.target.value)})} value={tempProduct.p35_minus20 ? Number(tempProduct.p35_minus20) : ''} type="number" /></td>
                        <td className="answ"><input onChange={(e) => setTempProduct({...tempProduct, p35_minus15: Number(e.target.value)})} value={tempProduct.p35_minus15 ? Number(tempProduct.p35_minus15) : ''} type="number" /></td>
                        <td className="answ"><input onChange={(e) => setTempProduct({...tempProduct, p35_minus10: Number(e.target.value)})} value={tempProduct.p35_minus10 ? Number(tempProduct.p35_minus10) : ''} type="number" /></td>
                        <td className="answ"><input onChange={(e) => setTempProduct({...tempProduct, p35_minus7: Number(e.target.value)})} value={tempProduct.p35_minus7 ? Number(tempProduct.p35_minus7) : ''} type="number" /></td>
                        <td className="answ"><input onChange={(e) => setTempProduct({...tempProduct, p35_minus2: Number(e.target.value)})} value={tempProduct.p35_minus2 ? Number(tempProduct.p35_minus2) : ''} type="number" /></td>
                        <td className="answ"><input onChange={(e) => setTempProduct({...tempProduct, p35_plus2: Number(e.target.value)})} value={tempProduct.p35_plus2 ? Number(tempProduct.p35_plus2) : ''} type="number" /></td>
                        <td className="answ"><input onChange={(e) => setTempProduct({...tempProduct, p35_plus7: Number(e.target.value)})} value={tempProduct.p35_plus7 ? Number(tempProduct.p35_plus7) : ''} type="number" /></td>
                        <td className="answ"><input onChange={(e) => setTempProduct({...tempProduct, p35_plus10: Number(e.target.value)})} value={tempProduct.p35_plus10 ? Number(tempProduct.p35_plus10) : ''} type="number" /></td>
                        <td className="answ"><input onChange={(e) => setTempProduct({...tempProduct, p35_plus15: Number(e.target.value)})} value={tempProduct.p35_plus15 ? Number(tempProduct.p35_plus15) : ''} type="number" /></td>
                    </tr>
                    <tr>
                        <td className='py-1 rid'>40</td>
                        <td className="answ"><input onChange={(e) => setTempProduct({...tempProduct, p40_minus25: Number(e.target.value)})} value={tempProduct.p40_minus25 ? Number(tempProduct.p40_minus25) : ''} type="number" /></td>
                        <td className="answ"><input onChange={(e) => setTempProduct({...tempProduct, p40_minus20: Number(e.target.value)})} value={tempProduct.p40_minus20 ? Number(tempProduct.p40_minus20) : ''} type="number" /></td>
                        <td className="answ"><input onChange={(e) => setTempProduct({...tempProduct, p40_minus15: Number(e.target.value)})} value={tempProduct.p40_minus15 ? Number(tempProduct.p40_minus15) : ''} type="number" /></td>
                        <td className="answ"><input onChange={(e) => setTempProduct({...tempProduct, p40_minus10: Number(e.target.value)})} value={tempProduct.p40_minus10 ? Number(tempProduct.p40_minus10) : ''} type="number" /></td>
                        <td className="answ"><input onChange={(e) => setTempProduct({...tempProduct, p40_minus7: Number(e.target.value)})} value={tempProduct.p40_minus7 ? Number(tempProduct.p40_minus7) : ''} type="number" /></td>
                        <td className="answ"><input onChange={(e) => setTempProduct({...tempProduct, p40_minus2: Number(e.target.value)})} value={tempProduct.p40_minus2 ? Number(tempProduct.p40_minus2) : ''} type="number" /></td>
                        <td className="answ"><input onChange={(e) => setTempProduct({...tempProduct, p40_plus2: Number(e.target.value)})} value={tempProduct.p40_plus2 ? Number(tempProduct.p40_plus2) : ''} type="number" /></td>
                        <td className="answ"><input onChange={(e) => setTempProduct({...tempProduct, p40_plus7: Number(e.target.value)})} value={tempProduct.p40_plus7 ? Number(tempProduct.p40_plus7) : ''} type="number" /></td>
                        <td className="answ"><input onChange={(e) => setTempProduct({...tempProduct, p40_plus10: Number(e.target.value)})} value={tempProduct.p40_plus10 ? Number(tempProduct.p40_plus10) : ''} type="number" /></td>
                        <td className="answ"><input onChange={(e) => setTempProduct({...tempProduct, p40_plus15: Number(e.target.value)})} value={tempProduct.p40_plus15 ? Number(tempProduct.p40_plus15) : ''} type="number" /></td>
                    </tr>
                    <tr>
                        <td className='py-1 rid'>45</td>
                        <td className="answ"><input onChange={(e) => setTempProduct({...tempProduct, p45_minus25: Number(e.target.value)})} value={tempProduct.p45_minus25 ? Number(tempProduct.p45_minus25) : ''} type="number" /></td>
                        <td className="answ"><input onChange={(e) => setTempProduct({...tempProduct, p45_minus20: Number(e.target.value)})} value={tempProduct.p45_minus20 ? Number(tempProduct.p45_minus20) : ''} type="number" /></td>
                        <td className="answ"><input onChange={(e) => setTempProduct({...tempProduct, p45_minus15: Number(e.target.value)})} value={tempProduct.p45_minus15 ? Number(tempProduct.p45_minus15) : ''} type="number" /></td>
                        <td className="answ"><input onChange={(e) => setTempProduct({...tempProduct, p45_minus10: Number(e.target.value)})} value={tempProduct.p45_minus10 ? Number(tempProduct.p45_minus10) : ''} type="number" /></td>
                        <td className="answ"><input onChange={(e) => setTempProduct({...tempProduct, p45_minus7: Number(e.target.value)})} value={tempProduct.p45_minus7 ? Number(tempProduct.p45_minus7) : ''} type="number" /></td>
                        <td className="answ"><input onChange={(e) => setTempProduct({...tempProduct, p45_minus2: Number(e.target.value)})} value={tempProduct.p45_minus2 ? Number(tempProduct.p45_minus2) : ''} type="number" /></td>
                        <td className="answ"><input onChange={(e) => setTempProduct({...tempProduct, p45_plus2: Number(e.target.value)})} value={tempProduct.p45_plus2 ? Number(tempProduct.p45_plus2) : ''} type="number" /></td>
                        <td className="answ"><input onChange={(e) => setTempProduct({...tempProduct, p45_plus7: Number(e.target.value)})} value={tempProduct.p45_plus7 ? Number(tempProduct.p45_plus7) : ''} type="number" /></td>
                        <td className="answ"><input onChange={(e) => setTempProduct({...tempProduct, p45_plus10: Number(e.target.value)})} value={tempProduct.p45_plus10 ? Number(tempProduct.p45_plus10) : ''} type="number" /></td>
                        <td className="answ"><input onChange={(e) => setTempProduct({...tempProduct, p45_plus15: Number(e.target.value)})} value={tempProduct.p45_plus15 ? Number(tempProduct.p45_plus15) : ''} type="number" /></td>
                    </tr>
                    <tr>
                        <td className='py-1 rid'>50</td>
                        <td className="answ"><input onChange={(e) => setTempProduct({...tempProduct, p50_minus25: Number(e.target.value)})} value={tempProduct.p50_minus25 ? Number(tempProduct.p50_minus25) : ''} type="number" /></td>
                        <td className="answ"><input onChange={(e) => setTempProduct({...tempProduct, p50_minus20: Number(e.target.value)})} value={tempProduct.p50_minus20 ? Number(tempProduct.p50_minus20) : ''} type="number" /></td>
                        <td className="answ"><input onChange={(e) => setTempProduct({...tempProduct, p50_minus15: Number(e.target.value)})} value={tempProduct.p50_minus15 ? Number(tempProduct.p50_minus15) : ''} type="number" /></td>
                        <td className="answ"><input onChange={(e) => setTempProduct({...tempProduct, p50_minus10: Number(e.target.value)})} value={tempProduct.p50_minus10 ? Number(tempProduct.p50_minus10) : ''} type="number" /></td>
                        <td className="answ"><input onChange={(e) => setTempProduct({...tempProduct, p50_minus7: Number(e.target.value)})} value={tempProduct.p50_minus7 ? Number(tempProduct.p50_minus7) : ''} type="number" /></td>
                        <td className="answ"><input onChange={(e) => setTempProduct({...tempProduct, p50_minus2: Number(e.target.value)})} value={tempProduct.p50_minus2 ? Number(tempProduct.p50_minus2) : ''} type="number" /></td>
                        <td className="answ"><input onChange={(e) => setTempProduct({...tempProduct, p50_plus2: Number(e.target.value)})} value={tempProduct.p50_plus2 ? Number(tempProduct.p50_plus2) : ''} type="number" /></td>
                        <td className="answ"><input onChange={(e) => setTempProduct({...tempProduct, p50_plus7: Number(e.target.value)})} value={tempProduct.p50_plus7 ? Number(tempProduct.p50_plus7) : ''} type="number" /></td>
                        <td className="answ"><input onChange={(e) => setTempProduct({...tempProduct, p50_plus10: Number(e.target.value)})} value={tempProduct.p50_plus10 ? Number(tempProduct.p50_plus10) : ''} type="number" /></td>
                        <td className="answ"><input onChange={(e) => setTempProduct({...tempProduct, p50_plus15: Number(e.target.value)})} value={tempProduct.p50_plus15 ? Number(tempProduct.p50_plus15) : ''} type="number" /></td>
                    </tr>
                </table>

                { error && <div className="w-full flex items-center justify-center text-center text-sm font-[500] text-red-600">
                    <span>{error}</span>    
                </div>}
                <div onClick={saveNewValues} className={`mt-2.5 py-3 w-full bg-[#FF4510] justify-center rounded-xl text-white font-[600] text-lg text-center flex items-center ${loading ? 'opacity-50 grayscale cursor-default' : 'cursor-pointer'}`}>
                    <span>{loading ? 'Trwa zapisywanie...' : 'Zapisz zmiany'}</span>
                </div>
                <div onClick={() => setShow(false)} className={`mt-2.5 py-3 w-full justify-center rounded-xl text-gray-500 font-[500] border-2 border-gray-300 text-base text-center flex items-center cursor-pointer`}>
                    <span>Zamknij</span>
                </div>
            </div>
            <div className="bg-black/85 w-full h-full absolute top-0 left-0 z-30 cursor-pointer" onClick={() => setShow(false)}></div>
        </div>
    )
}

export default DetailsProductModal