import { addInstalator } from '@/utils/supabase/addInstalator'
import { fetchSingleInstalatorData } from '@/utils/supabase/fetchSingleInstalatorData'
import { Instalators } from '@prisma/client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import loadingIco from '@/assets/svg/loader.svg'
import { saveInstalator } from '@/utils/supabase/saveInstalator'
import { uuid } from 'uuidv4';

function AddNewInstalatorModal({ fetchAllInstalators, hideModal, edit = {on: false, id: ''} } : {fetchAllInstalators: any, hideModal?: any, edit?: {on?: boolean, id?: string}}) {
    const [ visible, setVisible ] = useState(false)
    const [ loading, setLoading ] = useState(false)
    const [ valid, setValid ] = useState(false)
    const [ newInstalator, setNewInstalator ] = useState<Instalators>({
        id: uuid(),
        name: '',
        phone: '',
        postalAndCity: '',
    })

    const startNewInstalator = () => {
        setVisible(true)
    }

    const fetchCurrentInstalatorData = async (id: string) => {
        setLoading(true)
        const data = await fetchSingleInstalatorData(id)

        if(data.response){
            setNewInstalator(data.data)
        }

        setLoading(false)
    }

    useEffect(() => {
        setLoading(false)
        setValid(false);

        if(edit.on && edit.id){
            fetchCurrentInstalatorData(edit.id)
        }
    }, [])

    const handleAddNewInstalator = async () => {
        if(loading || !valid) return false;

        setLoading(true)
        let addInstalatorResult: any = await addInstalator(newInstalator)
        
        if(addInstalatorResult.response){
            setLoading(false)
            setValid(false)
            setVisible(false)
            await fetchAllInstalators()
            toast.success('Zapisano poprawnie nowego instalatora')
        }
        else {
            toast.error('Wystąpił błąd podczas zapisywania nowego instalatora')
            setLoading(false)
            setValid(false)
            setVisible(false)
            return false;
        }
    }

    const handleEditInstalator = async () => {
        if(loading || !valid) return false;

        setLoading(true)
        let saveInstalatorResult: any = await saveInstalator(newInstalator)
        
        if(saveInstalatorResult.response){
            setLoading(false)
            setValid(false)
            setVisible(false)
            await fetchAllInstalators()
            hideModal()
            toast.success('Zapisano poprawnie zmiany')
        }
        else {
            toast.error('Wystąpił błąd podczas zapisywania zmian')
            setLoading(false)
            setValid(false)
            setVisible(false)
            hideModal()
            return false;
        }
    }

    const submitOnEnter = () => {
        edit.on ? handleEditInstalator() : handleAddNewInstalator()
    }

    useEffect(() => {
        if(newInstalator.name && newInstalator.name.length > 0 && newInstalator.phone && newInstalator.phone.length > 7 && newInstalator.postalAndCity && newInstalator.postalAndCity.length > 6){
            setValid(true)
        } else setValid(false)
    }, [newInstalator])

    return (
        <div className='flex justify-end'>
            {!edit.on && <div className='text-white opacity-75 hover:opacity-100 transition-all duration-200 bg-[#FF4510] cursor-pointer font-semibold px-7 mt-10 py-2.5 rounded' onClick={startNewInstalator}>+ Dodaj nowego instalatora</div>}

            {(visible || edit.on) && <div className='fixed top-0 left-0 z-[100] w-dvw h-dvh flex items-center justify-center'>
                <div className='bg-white px-10 py-10 z-[101] rounded-lg max-w-[90%] w-full md:max-w-[420px]'>
                    { loading ? 
                    <div className='flex items-center justify-center py-20'>
                        <Image src={loadingIco.src} height="24" width="24" alt="Loading..." className="animate-spin opacity-30" />
                    </div>      
                    : <div className='flex flex-col gap-4 w-full'>
                        <span className='text-lg font-semibold mb-3'>{edit.on ? 'Edytuj instalatora' : 'Dodaj nowego instalatora'}</span>
                        <div className='flex flex-col gap-1 w-full'>
                            <label className='text-sm'>Nazwa</label>
                            <input onKeyDown={(e) => e.key === 'Enter' && submitOnEnter()} value={newInstalator.name} disabled={loading} placeholder='np. Insta-tex Warszawa' className='border rounded outline-none h-[40px] px-2 flex flex-row border-[#CDCDCD]' type="text" onChange={(e) => setNewInstalator({...newInstalator, name: e.target.value})} />
                        </div>
                        <div className='flex flex-col gap-1 w-full'>
                            <label className='text-sm'>Telefon</label>
                            <input onKeyDown={(e) => e.key === 'Enter' && submitOnEnter()} value={newInstalator.phone ? newInstalator.phone : ''} disabled={loading} placeholder='np. +48 123-456-789' className='border rounded outline-none h-[40px] px-2 flex flex-row border-[#CDCDCD]' type="text" onChange={(e) => setNewInstalator({...newInstalator, phone: e.target.value})} />
                        </div>
                        <div className='flex flex-col gap-1 w-full'>
                            <label className='text-sm'>Kod pocztowy i miasto</label>
                            <input onKeyDown={(e) => e.key === 'Enter' && submitOnEnter()} value={newInstalator.postalAndCity ? newInstalator.postalAndCity : ''} disabled={loading} placeholder='np. 05-825 Grodzisk Mazowiecki' className='border rounded outline-none h-[40px] px-2 flex flex-row border-[#CDCDCD]' type="text" onChange={(e) => setNewInstalator({...newInstalator, postalAndCity: e.target.value})} />
                        </div>
                        <div onClick={edit.on ? handleEditInstalator : handleAddNewInstalator} className={`text-white font-semibold bg-[#FF4510] mt-3 text-center rounded py-3 px-8 ${valid ? 'cursor-pointer' : 'opacity-50 grayscale'}`}>{loading ? edit.on ? 'Trwa zapisywanie...' : 'Trwa dodawanie...' : edit.on ? 'Zapisz informacje' : 'Dodaj instalatora'}</div>
                    </div> }
                </div>
                <div style={{backdropFilter: 'blur(3px)'}} className='bg-black/90 w-full h-full absolute' onClick={edit.on ? () => hideModal() : () => setVisible(false)}></div>
            </div> }
        </div>
    )
}

export default AddNewInstalatorModal