import { Product, Raport } from '@prisma/client'
import React from 'react'
import CustomAdminDetailsInputData from './CustomAdminDetailsInputData'
import CustomAdminDetailsDivider from './CustomAdminDetailsDivider'
import DynamicHouseSketch from '@/app/components/Calculator/2-screen/1-step/DynamicHouseSketch'
import logo from '@/assets/png/logo-black.png'
import Image from 'next/image'

function DetailedRaportAdmin({data}:{data: Raport}) {
    if(!data){
        return (
            <div>#err</div>
        )
    }

    return (
        <div className='flex flex-col gap-5 mt-[-20px]'>
            <Image src={logo.src} height={20} width={110} className='mx-auto extraMinusMtOnPrint' alt="Logo Gree" />

            <CustomAdminDetailsDivider text='Dane raportu' />
            <CustomAdminDetailsInputData label='ID Raportu' data={data.id} />
            <CustomAdminDetailsInputData label='Wygenerowano' data={new Date(data.created_at).toLocaleString('pl-PL', {day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric'})} />
            
            <CustomAdminDetailsDivider text='Dane klienta' />
            <CustomAdminDetailsInputData checkBox={true} label='Zgoda na wysyłkę raportu do klienta' data={data.send_raport_to_email && data.send_raport_to_email.indexOf('Chcę') >= 0 ? 'yes' : 'no'} />
            <CustomAdminDetailsInputData label='Adres email' data={data.send_raport_email} />
            <CustomAdminDetailsInputData checkBox={true} label='Zgoda na wysyłkę oferty do firm' data={data.send_raport_to_near_companies && data.send_raport_to_near_companies.indexOf('Chcę') >= 0 ? 'yes' : 'no'} />
            <CustomAdminDetailsInputData label='Numer telefonu' data={data.contact_phone_number} />
            <CustomAdminDetailsInputData label='Adres email' data={data.contact_email_address} />
            <CustomAdminDetailsInputData checkBox={true} label='Akceptacja polityki prywatności' data={data.rules1 ? 'yes' : 'no'} />
            <CustomAdminDetailsInputData checkBox={true} label='Akceptacja regulaminu' data={data.rules2 ? 'yes' : 'no'} />
            
            <CustomAdminDetailsDivider text='Informacje o budynku' />
            <CustomAdminDetailsInputData label='Lata budowy' data={data.house_building_years} />
            <CustomAdminDetailsInputData label='Lokalizacja' data={data.house_location_full_name} />
            <CustomAdminDetailsInputData label='Typ budynku' data={data.building_type} />


            <CustomAdminDetailsDivider text='Informacje wstępne' />
            <CustomAdminDetailsInputData checkBox={true} label='Znam zapotrzebowanie cieplne' data={data.heat_demand_know ? 'yes' : 'no'} />
            {
                data.heat_demand_know ? 
                <CustomAdminDetailsInputData checkBox={true} label='Zapotrzebowanie cieplne' data={data.heat_demand_kW ? `${data.heat_demand_kW} kWh` : ''} /> : 
                <CustomAdminDetailsInputData checkBox={true} label='Projektowa temperatura pomieszczenia' data={data.heat_demand_temp ? `${data.heat_demand_temp} °C` : ''} />
            }


            <CustomAdminDetailsDivider text='Wymiary budynku' />
            <CustomAdminDetailsInputData checkBox={true} label='Obrys budynku' data={data.building_outline} />
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

            <CustomAdminDetailsDivider text='Układ pięter' />
            <CustomAdminDetailsInputData label='Dom jest' data={data.house_floor_plan} />
            <CustomAdminDetailsInputData label='Dach jest' data={data.house_roof_plan} />
            <CustomAdminDetailsInputData label='Piwnica' data={data.building_has_basement ? 'yes' : 'no'} />
            <CustomAdminDetailsInputData label='Ogrzewane piętra' data={data.heating_levels} />
            <CustomAdminDetailsInputData label='Wysokoć pięter' data={data.house_levels_height} />
            <CustomAdminDetailsDivider text='Dodatowa elewacja' />
            <CustomAdminDetailsInputData label='Dom ma balkon(y)' data={data.building_has_taras ? 'yes' : 'no'} />
            <CustomAdminDetailsInputData label='Garaż w budynku' data={data.house_garage} />

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
            {
                data.house_insulation && 
                <>
                    <CustomAdminDetailsInputData checkBox={true} label='Docieplenie od zewnątrz' data={data.outside_insulation} />
                    <CustomAdminDetailsInputData checkBox={true} label='Grubość docieplenia od zewnątrz' data={data.insulation_thickness ? `${data.insulation_thickness} cm` : ''} />
                </>
            }

            <CustomAdminDetailsDivider text='Poddasze i parter' />
            <CustomAdminDetailsInputData checkBox={true} label='Izolacja dachu' data={data.is_roof_isolation} />
            {
                data.is_roof_isolation && data.is_roof_isolation.indexOf('Tak') >=0 &&
                <>
                    <CustomAdminDetailsInputData checkBox={true} label='Materiał' data={data.isolation_roof_material} />
                    <CustomAdminDetailsInputData checkBox={true} label='Grubość' data={data.isolation_roof_thickness ? `${data.isolation_roof_thickness} cm` : ''} />
                </>
            }
            <CustomAdminDetailsInputData checkBox={true} label='Izolacja podłogi parteru' data={data.is_parter_floor_isolation} />
            {
                data.is_parter_floor_isolation && data.is_parter_floor_isolation.indexOf('Tak') >=0 &&
                <>
                    <CustomAdminDetailsInputData checkBox={true} label='Materiał' data={data.isolation_parter_floor_material} />
                    <CustomAdminDetailsInputData checkBox={true} label='Grubość' data={data.isolation_parter_floor_thickness ? `${data.isolation_parter_floor_thickness} cm` : ''} />
                </>
            }

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
            {
                data.count_need_energy_cwu &&
                <>
                    <CustomAdminDetailsInputData checkBox={true} label='Ile osób używa ciepłej wody?' data={data.hot_water_person_using} />
                    <CustomAdminDetailsInputData checkBox={true} label='Jak intensywnie używana jest ciepła woda?' data={data.hot_water_using_style} />
                </>
            }
        </div>
    )
}

export default DetailedRaportAdmin