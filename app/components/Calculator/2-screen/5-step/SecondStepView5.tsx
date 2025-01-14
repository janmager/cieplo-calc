import React, { useEffect, useState } from 'react'
import RaportOverviewWithSuggestion from './RaportOverviewWithSuggestion/RaportOverviewWithSuggestion'
import ContactDetails from './ContactDetails/ContactDetails'
import FullRaportPreview from './FullRaportPreview/FullRaportPreview'
import { addNewRaport } from '@/utils/supabase/addNewRaport'
import loaderImg from '@/assets/svg/loader.svg'
import Image from 'next/image'
import toast, { Toaster } from 'react-hot-toast'
import { countWarmAPI } from '@/utils/api/countWarmAPI'

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

    const handleCountCieploAPI = async () => {
        setLoading(true)

        const apiResponse = await countWarmAPI(formData);
        console.log(apiResponse)

        // if(apiResponse.response){
        //     alert('success')
        // }
        // else{
        //     alert(':(')
        // }

        const formatedData = {
            token: process.env.NEXT_PUBLIC_API_KEY,
            "building_type": "single_house",
            "construction_year": 2020,
            "construction_type": "traditional",
            "latitude": 51.4453433,
            "longitude": 16.2334445,
            "building_length": 12.5,
            "building_width": 6,
            "floor_area": 45,
            "floor_perimeter": 125,
            "building_floors": 3,
            "building_heated_floors": [0, 1, 2],
            "floor_height": 2.6,
            "building_roof": "steep",
            "has_basement": true,
            "has_balcony": true,
            "has_garage": false,
            "garage_type": "double_unheated",
            "wall_size": 65,
            "primary_wall_material": 57,
            "secondary_wall_material": null,
            "internal_wall_isolation": {
                "material": 88,
                "size": 5
            },
            "external_wall_isolation": {
                "material": 88,
                "size": 15
            },
            "top_isolation": {
                "material": 68,
                "size": 35
            },
            "bottom_isolation": {
                "material": 71,
                "size": 5
            },
            "number_doors": 2,
            "number_balcony_doors": 2,
            "number_windows": 12,
            "number_huge_windows": 0,
            "doors_type": "new_metal",
            "windows_type": "new_double_glass",
            "indoor_temperature": 21,
            "ventilation_type": "natural",
            "include_hot_water": true,
            "hot_water_persons": 3,
            "hot_water_usage": "shower_bath",
            "whats_over": "heated_room",
            "whats_under": "heated_room",
            "whats_north": "heated_room",
            "whats_south": "unheated_room",
            "whats_east": "heated_room",
            "whats_west": "outdoor",
            "on_corner": true,
            "unheated_space_under_type": "worst",
            "unheated_space_over_type": "great"
        }

        const result = await fetch(`/api/cieplo`);

        let res = await result.json();
        console.log(res)
    }

    useEffect(() => {
        if(currentStep == 3){
            handleAddNewRaport()
        }
        if(currentStep == 2){
            // count with cieplo app API
            // ...
            handleCountCieploAPI()
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
            {currentStep == 1 && <RaportOverviewWithSuggestion loadingUpper={loading} formData={formData} step={currentStep} setStep={setCurrentStep} setFormData={setFormData} /> }
            {currentStep == 2 && <ContactDetails formData={formData} step={currentStep} setStep={setCurrentStep} setFormData={setFormData} /> }
            {currentStep == 3 && <FullRaportPreview formData={formData} step={currentStep} setStep={setCurrentStep} setFormData={setFormData} /> }
        </div>
    )
}

export default SecondStepView5