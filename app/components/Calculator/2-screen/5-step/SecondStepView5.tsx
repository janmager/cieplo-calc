import React, { useEffect, useState } from 'react'
import RaportOverviewWithSuggestion from './RaportOverviewWithSuggestion/RaportOverviewWithSuggestion'
import ContactDetails from './ContactDetails/ContactDetails'
import FullRaportPreview from './FullRaportPreview/FullRaportPreview'
import { addNewRaport } from '@/utils/supabase/addNewRaport'
import loaderImg from '@/assets/svg/loader.svg'
import Image from 'next/image'
import toast, { Toaster } from 'react-hot-toast'

function SecondStepView5({formData, setFormData}: {formData: any, setFormData: any}) {
    const [ currentStep, setCurrentStep ] = useState(1)
    const [ loading, setLoading ] = useState(false)

    const handleAddNewRaport = async () => {
        setLoading(true)
        try{
            let data = formData;
            data.id = crypto.randomUUID();
            data.created_at =  new Date(),
            setFormData(data)
            const add = await addNewRaport(data);
    
            if(add.response){
                toast.success('Zapisano poprawnie Twój raport')
            }
            else{
                toast.error('Wystąpił błąd podczas zapisywania raportu')
            }
            setLoading(false)
        }
        catch(error){
            toast.error('Wystąpił błąd podczas zapisywania raportu')
            console.log(error)
            setLoading(false)
        }
    }

    useEffect(() => {
        if(currentStep == 3){
            handleAddNewRaport()
        }
    }, [currentStep])
  
    if(loading){
        return (
            <div className='flex justify-center items-center py-40'>
                <Image src={loaderImg.src} height={24} width={24} className='animate-spin opacity-30' alt='loader' />
            </div>
        )
    }

    return (
        <div className='flex flex-col gap-14 w-full'>           
            <Toaster position="top-center" />
            {currentStep == 1 && <RaportOverviewWithSuggestion formData={formData} step={currentStep} setStep={setCurrentStep} setFormData={setFormData} /> }
            {currentStep == 2 && <ContactDetails formData={formData} step={currentStep} setStep={setCurrentStep} setFormData={setFormData} /> }
            {currentStep == 3 && <FullRaportPreview formData={formData} step={currentStep} setStep={setCurrentStep} setFormData={setFormData} /> }
        </div>
    )
}

export default SecondStepView5