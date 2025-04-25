import React, { useEffect, useState } from 'react'
import RaportOverviewWithSuggestion from './RaportOverviewWithSuggestion/RaportOverviewWithSuggestion'
import ContactDetails from './ContactDetails/ContactDetails'
import FullRaportPreview from './FullRaportPreview/FullRaportPreview'
import { addNewRaport } from '@/utils/supabase/addNewRaport'
import loaderImg from '@/assets/svg/loader.svg'
import Image from 'next/image'
import toast, { Toaster } from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { countKwForSpecificTemp } from '@/utils/api/countKwForSpecificTemp'
import { getPompaData } from '@/utils/api/getPompaData'
import { getPunktBiwalentny } from '@/utils/api/getPunktBiwalentny'
import { Product } from '@prisma/client'
import { findBestFitProduct } from '@/utils/api/findBestFitProduct'
import { selectHeatPumps } from '@/utils/api/selectHeatPumps'
import { uuid } from 'uuidv4'

function SecondStepView5({formData, setFormData, errors, setErrors, products}: {formData: any, setFormData: any, errors: any, setErrors: any, products: any}) {
    const [ currentStep, setCurrentStep ] = useState(1)
    const [ loading, setLoading ] = useState(false)
    const [ suggestedProducts, setSuggestedProducts ] = useState(null)

    const router = useRouter();

    const handleAddNewRaport = async () => {
        setLoading(true)
        
        try{
            let data = formData;
            data.id = uuid();
            data.created_at =  new Date(),
            setFormData(data)
            const add = await addNewRaport(data);
    
            if(add.response){
                // toast.success('Zapisano poprawnie Twój raport')
                if(add.response && formData.contact_email_address){
                    try {
                        const response = await fetch('/api/mail/raport/send', {
                            method: 'post',
                            body: JSON.stringify({email: formData.contact_email_address, raportId: formData.id})
                        });
                
                        if (!response.ok) {
                            throw new Error(`response status: ${response.status}`);
                        }
                        const responseData = await response.json();
                    }
                    catch(e){
                        console.log(e);
                        toast.error('Wystąpił błąd podczas wysyłania raportu do klienta')
                        setLoading(false)
                    }   
                }
            }
            else{
                toast.error('Wystąpił błąd podczas zapisywania raportu')
            }
        }
        catch(error){
            toast.error('Wystąpił błąd podczas zapisywania raportu')
            console.log(error)
            setLoading(false)
        }
        finally{
            router.push(`/wynik/${formData.id}`)
        }
    }

    const handleCountCieploAPI = async () => {
        if(loading) return false;
        setLoading(true);
        let kw_need = formData.heat_demand.kW;
        let fromApi: any = false;

        if(!formData.heat_demand.know){
            const result = await fetch(`/api/cieplo`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
            },
                body: JSON.stringify(formData),
            });

            let res = await result.json();
            if(res.response){
                fromApi = {
                    api_total_area: res.data.total_area,
                    api_heated_area: res.data.heated_area,
                    api_max_heating_power: res.data.max_heating_power,
                    api_avg_heating_power: res.data.avg_heating_power,
                    api_bivalent_point_heating_power: res.data.bivalent_point_heating_power,
                    api_hot_water_power: res.data.hot_water_power,
                    api_annual_energy_consumption: res.data.annual_energy_consumption,
                    api_annual_energy_consumption_factor: res.data.annual_energy_consumption_factor,
                    api_heating_power_factor: res.data.heating_power_factor,
                    api_design_outdoor_temperature: res.data.design_outdoor_temperature,
                    api_avg_outdoor_temperature: res.data.avg_outdoor_temperature
                }
                kw_need = Number(res.data.max_heating_power) + Number(res.data.hot_water_power ? res.data.hot_water_power : 0)
            }
            else{
                toast.error('Błąd pobierania danych z API')
                router.push('/error')
            }
        }

        let checkedProducts: any = selectHeatPumps({
            products: products, 
            proj_temp_outside: formData.project_outside_temp, 
            needed_kw: kw_need,
            temp_inside: formData.temp_in_heat_rooms,
            max_install_temp: formData.max_temp_of_power_instalation.split(' ')[0]
        })

        checkedProducts = checkedProducts.filter((product: any) => {
            return product.differenceBivalent <= 2
        })

        setFormData({
            ...formData, 
            ...fromApi && fromApi,
            recommendedProducts: JSON.stringify(checkedProducts),
        })

        setSuggestedProducts(checkedProducts);
        setLoading(false)
    }

    useEffect(() => {
        if(currentStep == 3){
            handleAddNewRaport()
        }

        window.scrollTo(0, 0);
    }, [currentStep])

  
    if(loading){
        return (
            <div className='flex justify-center items-center py-40'>          
                <Toaster position="top-center" />
                <Image src={loaderImg.src} height={24} width={24} className='animate-spin opacity-30' alt='loader' />
            </div>
        )
    }

    if(products && !loading) return (
        <div className={`flex flex-col gap-14 w-full ${formData.heat_demand.know ? 'mt-[90px]' : ''}`}>           
            <Toaster position="top-center" />
            {currentStep == 1 && <RaportOverviewWithSuggestion products={products} suggestedProducts={suggestedProducts} handleCountCieploAPI={handleCountCieploAPI} loadingUpper={loading} formData={formData} step={currentStep} setStep={setCurrentStep} setFormData={setFormData} /> }
            {currentStep == 2 && <ContactDetails loadingUpper={loading} errors={errors} setErrors={setErrors} formData={formData} step={currentStep} setStep={setCurrentStep} setFormData={setFormData} /> }
            {currentStep == 3 && <FullRaportPreview formData={formData} step={currentStep} setStep={setCurrentStep} setFormData={setFormData} /> }
        </div>
    )
}

export default SecondStepView5