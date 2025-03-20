'use client'

import React, { useEffect, useState } from 'react'
import FirstCalcView from './1-screen/FirstCalcView'
import SecondCalcView from './2-screen/SecondCalcView'
import { send_raport_accept_24h } from '@/app/consts/send_raport_accept_24h'

function CalculatorContainer() {
    const [ viewId, setViewId ] = useState<Number>(1)
    const [ errors, setErrors ] = useState({})
    const [ formData, setFormData ] = useState<any>({
        // first step
        house_building_years: '',
        heat_demand: {
            know: false,
            temp: '',
            kW: ''
        },
        house_location: {
            lat: '',
            lng: '',
            full_name: ''
        },
        climate_zone: '',
        project_outside_temp: '',

        // second step
        building_type: '',
        building_outline: '',
        building_area: '',
        building_outline_m: '',
        building_outline_sizes: '',
        building_outline_length_m: '',
        building_outline_width_m: '',
        house_floor_plan: 'Parterowy',
        house_roof_plan: 'Płaski',
        heating_levels: ['Parter'],
        building_has_basement: false,
        house_levels_height: '',
        building_has_taras: false,
        house_garage: '',

        // third step
        building_construction_type: '',
        total_wall_thickness: '',
        basic_construction_material: '',
        additional_construction_material: '',
        wall_insulation: false,
        wall_inside_insulation: '',
        wall_insulation_thickness: '',
        house_insulation: false,
        outside_insulation: '',
        insulation_thickness: '',
        windows_type: '',
        windows_number: '',
        taras_doors_number: '',
        large_glazings_number: '',
        doors_type: '',
        outside_doors_number: '',

        // forth step
        is_roof_isolation: '',
        isolation_roof_material: '',
        isolation_roof_thickness: '',
        is_parter_floor_isolation: '',
        isolation_parter_floor_material: '',
        isolation_parter_floor_thickness: '',

        // fifth step
        main_heat_sources: 'Pompa ciepła powietrze-woda',
        temp_in_heat_rooms: '',
        vent_type: '',
        heating_isolation_material: '',
        heating_isolation_material_thickness: '',
        type_of_heating_instalation: '',
        max_temp_of_power_instalation: '',
        count_need_energy_cwu: false,
        hot_water_person_using: '',
        hot_water_using_style: '',
        hot_water_steroid_foto: false,
        hot_water_steroid_kolektor: false,

        // contact email
        rules1: false,
        rules2: false,
        send_raport_to_email: '',
        send_raport_to_near_companies: '',
        send_raport_accept_24h: '',
        send_raport_email: '',
        contact_phone_number: '',
        contact_email_address: '',
        raport_url: '',
        recommendedProducts: '',
        whats_over: '',
        whats_under: '',
        whats_north: '',
        whats_south: '',
        whats_east: '',
        whats_west: '',
        on_corner: false,
        number_stairways: '',
        number_elevators: '',

        // from api
        api_total_area: null,
        api_heated_area: null,
        api_max_heating_power: null,
        api_avg_heating_power: null,
        api_bivalent_point_heating_power: null,
        api_hot_water_power: null,
        api_annual_energy_consumption: null,
        api_annual_energy_consumption_factor: null,
        api_heating_power_factor: null,
        api_design_outdoor_temperature: null,
        api_avg_outdoor_temperature: null
        
    })

    if(viewId == 1) return <div className='w-full'><FirstCalcView setErrors={setErrors} errors={errors} formData={formData} setFormData={setFormData} setViewId={setViewId} /></div>;
    else if(viewId == 2) return <div><SecondCalcView setErrors={setErrors} errors={errors} formData={formData} setFormData={setFormData} /></div> 
}

export default CalculatorContainer