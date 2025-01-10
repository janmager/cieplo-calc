import React, { useState } from 'react'

function AddNewProductView() {
    const [ loading, setLoading ] = useState(false);
    const [ valid, setValid ] = useState(false);
    
    const [ newProduct, setNewProduct ] = useState<any>({
        name: '',
        desc: '',
        params: '',
    })

    const handleAddNewProduct = () => {
        if(loading) return false;
        if(!valid) return false;

        alert('adding...')
    }

    return (
        <div className='flex flex-col gap-5 items-end'>
            <div className='flex w-full flex-1 flex-col gap-1'>
                <label>Nazwa</label>
                <input onChange={(e) => setNewProduct({...newProduct, name: e.target.value})} value={newProduct.name} placeholder='podaj nazwę produktu...' className='w-full outline-none border px-3 py-2' type='text' />
            </div>
            <div className='flex w-full flex-1 flex-col gap-1'>
                <label>Opis</label>
                <input onChange={(e) => setNewProduct({...newProduct, desc: e.target.value})} value={newProduct.desc} placeholder='podaj opis produktu...' className='w-full outline-none border px-3 py-2' type='text' />
            </div>
            <div className='flex w-full flex-1 flex-col gap-1'>
                <label>Zdjęcie</label>
                
            </div>
            <div onClick={handleAddNewProduct} className={`text-white bg-[#FF4510] py-3 px-8 ${valid ? 'cursor-pointer' : 'opacity-50 grayscale'}`}>{loading ? 'Trwa dodawanie...' : 'Dodaj nowy produkt'}</div>
        </div>
    )
}

export default AddNewProductView