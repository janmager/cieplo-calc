'use client'

import React, { useEffect, useState } from 'react'
import FirstCalcView from './1-screen/FirstCalcView'
import SecondCalcView from './2-screen/SecondCalcView'

function CalculatorContainer() {
    const [ viewId, setViewId ] = useState<Number>(2)
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

        // 

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
        heating_levels: [],
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
        house_insulation: false,
        outside_insulation: '',
        insulation_thickness: '',
        windows_type: '',
        windows_number: '',
        taras_doors_number: '',
        large_glazings_number: '',
        doors_type: '',

        // forth step
        is_roof_isolation: '',
        isolation_roof_material: '',
        isolation_roof_thickness: '',
        is_parter_floor_isolation: '',
        isolation_parter_floor_material: '',
        isolation_parter_floor_thickness: '',

        // fifth step
        main_heat_sources: '',
        temp_in_heat_rooms: '',
        vent_type: '',
        heating_isolation_material: '',
        heating_isolation_material_thickness: '',
        type_of_heating_instalation: '',
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
        send_raport_email: '',
        contact_phone_number: '',
        contact_email_address: '',
        raport_url: '',
        recommendedProducts: '',
    })

    if(viewId == 1) return <div className='w-full'><FirstCalcView formData={formData} setFormData={setFormData} setViewId={setViewId} /></div>;
    else if(viewId == 2) return <div><SecondCalcView formData={formData} setFormData={setFormData} setViewId={setViewId} /></div> 
}

export default CalculatorContainer