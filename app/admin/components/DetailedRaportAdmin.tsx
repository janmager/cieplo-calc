'use client'

import { Instalators, Product, Raport } from '@prisma/client'
import React, { useEffect, useState } from 'react'
import CustomAdminDetailsInputData from './CustomAdminDetailsInputData'
import CustomAdminDetailsDivider from './CustomAdminDetailsDivider'
import DynamicHouseSketch from '@/app/components/Calculator/2-screen/1-step/DynamicHouseSketch'
import logo from '@/assets/png/logo-black.png'
import phoneIcon from '@/assets/svg/phone-icon-2.svg'
import postIcon from '@/assets/svg/post-icon.svg'
import Image from 'next/image'
import { getAllInstalators } from '@/utils/supabase/getAllInstalators'

function DetailedRaportAdmin({data, print = false, printAuto = false}:{data: Raport, print?: any, printAuto?: boolean}) {
    const [ instalators, setInstalators ] = useState<any>(null)

    if(!data){
        return (
            <div>#err</div>
        )
    }

    const getAllInstalatorsDb = async () => {

        const ins = await getAllInstalators();
        if(ins.response){
            setInstalators(ins.data)
        }
        else {
            setInstalators([])
        }
    }

    useEffect(() => {
        if(instalators == null){
            getAllInstalatorsDb()
        }
    }, [])

    // useEffect(() => {
    //     if(instalators.length >= 0 && printAuto){
    //         print();
    //     }
    // }, [instalators])

    return (
        <div className='flex flex-col gap-5 mt-[-20px]'>
            <Image src={'/logo.png'} height={20} width={110} className='mx-auto extraMinusMtOnPrint' alt="Logo Gree" />

            <CustomAdminDetailsDivider text='Dane raportu' />
            <CustomAdminDetailsInputData label='ID Raportu' data={data.id} />
            <CustomAdminDetailsInputData label='Wygenerowano' data={new Date(data.created_at).toLocaleString('pl-PL', {day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric'})} />
            
            <CustomAdminDetailsDivider text='Dane klienta' />
            <CustomAdminDetailsInputData checkBox={true} label='Zgoda na wysyłkę raportu do klienta' data={data.send_raport_to_email && data.send_raport_to_email.indexOf('Chcę') >= 0 ? 'yes' : 'no'} />
            <CustomAdminDetailsInputData checkBox={true} label='Zgoda na wysyłkę oferty do firm' data={data.send_raport_to_near_companies && data.send_raport_to_near_companies.indexOf('Chcę') >= 0 ? 'yes' : 'no'} />
            <CustomAdminDetailsInputData checkBox={true} label='Zgoda na kontakt z ekspertem Gree' data={data.send_raport_accept_24h && data.send_raport_accept_24h.indexOf('Tak') >= 0 ? 'yes' : 'no'} />
            {data.contact_phone_number && <CustomAdminDetailsInputData label='Numer telefonu' data={data.contact_phone_number} />}
            {data.contact_email_address && <CustomAdminDetailsInputData label='Adres email' data={data.contact_email_address} />}
            {/* <CustomAdminDetailsInputData checkBox={true} label='Akceptacja polityki prywatności' data={data.rules1 ? 'yes' : 'no'} /> */}
            {/* <CustomAdminDetailsInputData checkBox={true} label='Akceptacja regulaminu' data={data.rules2 ? 'yes' : 'no'} /> */}
            
            <CustomAdminDetailsDivider text='Informacje o budynku' />
            <CustomAdminDetailsInputData label='Lata budowy' data={data.house_building_years} />
            <CustomAdminDetailsInputData label='Lokalizacja' data={data.house_location_full_name} />
            {data.building_type && <CustomAdminDetailsInputData label='Typ budynku' data={data.building_type} />}

            <CustomAdminDetailsDivider text='Informacje wstępne' />
            <CustomAdminDetailsInputData checkBox={true} label='Znam zapotrzebowanie cieplne' data={data.heat_demand_know ? 'yes' : 'no'} />
            <CustomAdminDetailsInputData checkBox={true} label={`${data.api_max_heating_power ? 'Obliczone z' : 'Z'}apotrzebowanie cieplne`} data={data.heat_demand_kW ? `${data.heat_demand_kW} kWh` : `${(Number(data.api_max_heating_power) + (data.api_hot_water_power ? Number(data.api_hot_water_power) : 0)).toFixed(2)} kWh`} /> 
            <CustomAdminDetailsInputData checkBox={true} label='Projektowa temperatura pomieszczenia' data={data.heat_demand_temp ? `${data.heat_demand_temp} °C` : ''} />

            {data.building_type && <CustomAdminDetailsDivider text='Wymiary budynku' />}
            {data.building_type && <CustomAdminDetailsInputData checkBox={true} label='Obrys budynku' data={data.building_outline} />}
            {
                data.building_outline && data.building_outline?.indexOf('Regularny') >= 0 && <>
                    <CustomAdminDetailsInputData checkBox={true} label='Wymiary obrysu budynku' data={data.building_outline_sizes} />
                </>
            }
            {
                data.building_outline_sizes && data.building_outline_sizes?.indexOf('powierzch') >= 0 &&
                <CustomAdminDetailsInputData checkBox={true} label='Powierzchnia zabudowy' data={data.building_area ? `${data.building_area} m²` : ''} />
            }
            {
                data.building_outline_sizes && data.building_outline_sizes?.indexOf('wymiary') >= 0 &&
                <>
                    <CustomAdminDetailsInputData checkBox={true} label='Długość obrysu budynku' data={data.building_outline_length_m ? `${data.building_outline_length_m} m` : ''} />
                    <CustomAdminDetailsInputData checkBox={true} label='Szerokość obrysu budynku' data={data.building_outline_width_m ? `${data.building_outline_width_m} m` : ''} />
                </>
            }
            {
                data.building_outline && data.building_outline?.indexOf('Nieregularny') >= 0 && <>
                    <CustomAdminDetailsInputData checkBox={true} label='Powierzchnia zabudowy' data={data.building_area ? `${data.building_area} m²` : ''} />
                    <CustomAdminDetailsInputData checkBox={true} label='Obwód budynku' data={data.building_outline_m ? `${data.building_outline_m} m` : ''} />
                </>
            }

            {data.building_type && <>
                <CustomAdminDetailsDivider text='Układ pięter' />
                <CustomAdminDetailsInputData label='Dom jest' data={data.house_floor_plan} />
                <CustomAdminDetailsInputData label='Dach jest' data={data.house_roof_plan} />
                <CustomAdminDetailsInputData label='Piwnica' data={data.building_has_basement ? 'yes' : 'no'} />
                <CustomAdminDetailsInputData label='Ogrzewane piętra' data={data.heating_levels} />
                <CustomAdminDetailsInputData label='Wysokoć pięter' data={data.house_levels_height} />
                <CustomAdminDetailsDivider text='Dodatowa elewacja' />
                <CustomAdminDetailsInputData label='Dom ma balkon(y)' data={data.building_has_taras ? 'yes' : 'no'} />
                <CustomAdminDetailsInputData label='Garaż w budynku' data={data.house_garage} />
            </>}
            {data.building_type && <>
            <CustomAdminDetailsDivider text='Sytuacja poglądowa' />
            <DynamicHouseSketch formData={data} noMarginTop={true} paddingLeft={false} setFormData={null} />

            <CustomAdminDetailsDivider text='Ściany' />
            <CustomAdminDetailsInputData checkBox={true} label='Konstrukcja budynku' data={data.building_construction_type} />
            <CustomAdminDetailsInputData checkBox={true} label='Całkowita (razem z ew. dociepleniem) grubość ścian zewnętrznych' data={data.total_wall_thickness ? `${data.total_wall_thickness} cm` : ''} />
        
            <CustomAdminDetailsDivider text='Materiały konstrukcyjne' />
            <CustomAdminDetailsInputData checkBox={true} label='Podstawowy materiał' data={data.basic_construction_material} />
            <CustomAdminDetailsInputData checkBox={true} label='Dodatkowy materiał' data={data.additional_construction_material} />

            <CustomAdminDetailsDivider text='Okna i drzwi' />
            <CustomAdminDetailsInputData checkBox={true} label='Rodzaj okien' data={data.windows_type} />
            <CustomAdminDetailsInputData checkBox={true} label='Liczba okien' data={data.windows_number ? `${data.windows_number} szt.` : ''} />
            <CustomAdminDetailsInputData checkBox={true} label='Liczba drzwi balkonowych' data={data.taras_doors_number ? `${data.taras_doors_number} szt.` : ''} />
            <CustomAdminDetailsInputData checkBox={true} label='Liczba dużych przeszkleń' data={data.large_glazings_number ? `${data.large_glazings_number} szt.` : ''} />
            <CustomAdminDetailsInputData checkBox={true} label='Rodzaj drzwi zewnętrznych' data={data.doors_type} />

            <CustomAdminDetailsDivider text='Izolacja i ocieplenie' />
            <CustomAdminDetailsInputData checkBox={true} label='Izolacja wewnątrz ściany' data={data.wall_insulation ? 'yes' : 'no'} />
            <CustomAdminDetailsInputData checkBox={true} label='Dom jest docieplony' data={data.house_insulation ? 'yes' : 'no'} />
            </>}
            {
                data.house_insulation && 
                <>
                    <CustomAdminDetailsInputData checkBox={true} label='Docieplenie od zewnątrz' data={data.outside_insulation} />
                    <CustomAdminDetailsInputData checkBox={true} label='Grubość docieplenia od zewnątrz' data={data.insulation_thickness ? `${data.insulation_thickness} cm` : ''} />
                </>
            }

            {data.building_type && <>
            <CustomAdminDetailsDivider text='Poddasze i parter' />
            <CustomAdminDetailsInputData checkBox={true} label='Izolacja dachu' data={data.is_roof_isolation} />
            </>}
            {
                data.is_roof_isolation && data.is_roof_isolation.indexOf('Tak') >=0 &&
                <>
                    <CustomAdminDetailsInputData checkBox={true} label='Materiał' data={data.isolation_roof_material} />
                    <CustomAdminDetailsInputData checkBox={true} label='Grubość' data={data.isolation_roof_thickness ? `${data.isolation_roof_thickness} cm` : ''} />
                </>
            }
            {data.building_type && <CustomAdminDetailsInputData checkBox={true} label='Izolacja podłogi parteru' data={data.is_parter_floor_isolation} />}
            {
                data.is_parter_floor_isolation && data.is_parter_floor_isolation.indexOf('Tak') >=0 &&
                <>
                    <CustomAdminDetailsInputData checkBox={true} label='Materiał' data={data.isolation_parter_floor_material} />
                    <CustomAdminDetailsInputData checkBox={true} label='Grubość' data={data.isolation_parter_floor_thickness ? `${data.isolation_parter_floor_thickness} cm` : ''} />
                </>
            }

            {data.building_type && <>
                <CustomAdminDetailsDivider text='Ogrzewanie' />
                <CustomAdminDetailsInputData checkBox={true} label='Główne źródło ciepła' data={data.main_heat_sources} />
                <CustomAdminDetailsInputData checkBox={true} label='Temp w pomieszczeniach ogrzewanych' data={data.temp_in_heat_rooms ? `${data.temp_in_heat_rooms} °C` : ''} />
                <CustomAdminDetailsInputData checkBox={true} label='Rodzaj wentylacji' data={data.vent_type} />
                <CustomAdminDetailsInputData checkBox={true} label='Materiał' data={data.heating_isolation_material} />
                <CustomAdminDetailsInputData checkBox={true} label='Grubość' data={data.heating_isolation_material_thickness ? `${data.heating_isolation_material_thickness} cm` : ''} />

                <CustomAdminDetailsDivider text='Instalacja grzewcza' />
                <CustomAdminDetailsInputData checkBox={true} label='Rodzaj instalacji centralnego ogrzewania' data={data.type_of_heating_instalation} />
                <CustomAdminDetailsInputData checkBox={true} label='Instalacja fotowoltaiczna' data={data.hot_water_steroid_foto ? 'yes' : 'no'} />
                <CustomAdminDetailsInputData checkBox={true} label='Kolektory słoneczne' data={data.hot_water_steroid_kolektor ? 'yes' : 'no'} />
                <CustomAdminDetailsInputData checkBox={true} label='Oblicz zapotrzebowanie energii na podgrzewanie CWU' data={data.count_need_energy_cwu ? 'yes' : 'no'} />
            </>}
            {
                data.count_need_energy_cwu &&
                <>
                    <CustomAdminDetailsInputData checkBox={true} label='Ile osób używa ciepłej wody?' data={data.hot_water_person_using} />
                    <CustomAdminDetailsInputData checkBox={true} label='Jak intensywnie używana jest ciepła woda?' data={data.hot_water_using_style} />
                </>
            }
            {
                data.api_max_heating_power && 
                <>
                    <CustomAdminDetailsDivider text='Obliczone zapotrzebowanie' />
                    <CustomAdminDetailsInputData checkBox={true} label='Całkowita powierzchnia budynku' data={data.api_total_area ? `${data.api_total_area} m²` : '-'} />
                    <CustomAdminDetailsInputData checkBox={true} label='Ogrzewana powierzchnia budynku' data={data.api_heated_area ? `${data.api_heated_area} m²` : '-'} />
                    <CustomAdminDetailsInputData checkBox={true} col={true} label='Maksymalna moc grzewcza na potrzeby wyłącznie ogrzewania budynku w najzimniejszym dniu zimy (dla projektowej temperatury zewnętrznej)' data={data.api_max_heating_power ? `${Number(data.api_max_heating_power).toFixed(2)} kW` : '-'} />
                    <CustomAdminDetailsInputData checkBox={true} col={true} label='Przeciętna moc grzewcza na potrzeby wyłącznie ogrzewania budynku przy średniej zimowej temperaturze zewnętrznej' data={data.api_avg_heating_power ? `${Number(data.api_avg_heating_power).toFixed(2)} kW` : '-'} />
                    <CustomAdminDetailsInputData checkBox={true} col={true} label='Moc grzewcza w punkcie biwalentnym, tj. przy temperaturze zewnętrznej wyliczonej odpowiednio dla strefy klimatycznej, w której znajduje się budynek' data={data.api_bivalent_point_heating_power ? `${Number(data.api_bivalent_point_heating_power).toFixed(2)} kW` : '-'} />
                    {data.api_hot_water_power && <CustomAdminDetailsInputData checkBox={true} col={true} label='Dodatkowa moc grzewcza na potrzeby przygotowania CWU' data={data.api_hot_water_power ? `${Number(data.api_hot_water_power).toFixed(2)} kW` : '-'} />}
                    <CustomAdminDetailsInputData checkBox={true} col={true} label='Całkowite roczne zużycie energii na potrzeby wyłącznie ogrzewania budynku (nie jest w to wliczone przygotowanie CWU)' data={data.api_annual_energy_consumption ? `${Number(data.api_annual_energy_consumption).toFixed(2)} kWh` : '-'} />
                    <CustomAdminDetailsInputData checkBox={true} col={true} label='Współczynnik zapotrzebowania na ciepło.' data={data.api_annual_energy_consumption_factor ? `${Number(data.api_annual_energy_consumption_factor).toFixed(2)} kWh/m²` : '-'} />
                    <CustomAdminDetailsInputData checkBox={true} col={true} label='Współczynnik zapotrzebowania na moc grzewczą' data={data.api_heating_power_factor ? `${Number(data.api_heating_power_factor).toFixed(2)} W/m²` : '-'} />
                    <CustomAdminDetailsInputData checkBox={true} col={true} label='Projektowa temperatura zewnętrzna w danej lokalizacji, dla której liczona jest maksymalna wymagana moc grzewcza na potrzeby wyłącznie ogrzewania budynku' data={data.api_design_outdoor_temperature ? `${data.api_design_outdoor_temperature} °C` : '-'} />
                    <CustomAdminDetailsInputData checkBox={true} col={true} label='Średnia temperatura zewnętrzna w ciągu sezonu grzewczego na podstawie danych klimatycznych' data={data.api_avg_outdoor_temperature ? `${data.api_avg_outdoor_temperature} °C` : '-'} />
                </>
            }
            {data.recommendedProducts && data.recommendedProducts != '[]' && <div className='pagebreak flex flex-col gap-7'>
                <CustomAdminDetailsDivider text='Sugerowane urządzenia do Twojego budynku' />
                <div className="flex flex-col gap-5 mt-[-20px]">
                    {
                        data.recommendedProducts  && JSON.parse(data.recommendedProducts).map((item: any, index: number) => {
                            return (
                                <div key={index} className={`flex py-4 flex-col sm:flex-row items-center justify-center gap-4 bg-white px-5 rounded-2xl`}>
                                    <div>
                                        <img width="160" src={item.product.image} alt={item.product.name} />
                                    </div>
                                    <div className='w-full flex justify-center flex-col pr-5'>
                                        <span className='font-bold text-[#FF4510] text-xs uppercase'>{item.product.type}</span>
                                        <span className='text-[16px] font-[600] tracking-tight'>{item.product.name}</span>
                                        <span className='text-gray-500 text-sm'>{item.product.desc}</span>
                                        {item.product.product_link && <a href={`${item.product.product_link}`} target='_blank' className='border hover:bg-[#FF4510] hover:text-white border-[#FF4510] text-[#FF4510] text-[13px] mt-3 flex items-center justify-center h-[35px] w-full uppercase font-[700]'>
                                            ZOBACZ KARTĘ PRODUKTU
                                        </a>}
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>}
            {/* {instalators && <div className='flex flex-col gap-7'>
                <CustomAdminDetailsDivider text='Polecani instalatorzy' />
                <div className="flex flex-col gap-5 mt-[-20px]">
                    {
                        instalators.map((instalator: Instalators, id: number) => (
                            <div key={id} className={`flex py-4 flex-col itesm-center justify-center bg-white px-5 gap-2 rounded-2xl`}>
                                <div className="font-[600] text-sm sm:text-lg tracking-tighter">
                                    {instalator.name}
                                </div>
                                <div className="grid sm:grid-cols-2 w-full mt-2 sm:mt-0 gap-2 md:gap-5`">
                                    <div className='flex flex-row gap-3 items-center'>
                                        <Image src={'/phone.svg'} className="pdf-margin-top" height={14} width={13} alt='phone' />
                                        <span className='text-[#FF4510] onPrintText14 text-[14px] font-[400]'>{instalator.phone}</span>
                                    </div>
                                    <div className='flex flex-row gap-3 items-center'>
                                        <Image src={'/post.svg'} className="pdf-margin-top" height={24} width={20} alt='phone' />
                                        <span className='text-[#FF4510] onPrintText14 text-[14px] font-[400]'>{instalator.postalAndCity}</span>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>} */}
            <div className='mt-5 w-full'>
                <a href={`/wynik/${data.id}`} target='_blank' className="w-full block text-center text-base font-[600] uppercase py-4 px-3 bg-[#FF4510] text-white rounded-md">Otwórz raport online</a>
            </div>
        </div>
    )
}

export default DetailedRaportAdmin