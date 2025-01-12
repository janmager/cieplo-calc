'use server'

import prisma from '@/app/libs/db';

export const addNewRaport = async (raport: any) => {
    try{
        const add = await prisma.raport.create({
            data: {
                id: raport.id,
                created_at: raport.created_at,
                house_building_years: raport.house_building_years,
                house_location_full_name: raport.house_location.full_name,
                house_location_lat: (raport.house_location.lat).toString(),
                house_location_lng: (raport.house_location.lng).toString(),
                heat_demand_know: raport.heat_demand.know,
                heat_demand_temp: raport.heat_demand.temp,
                heat_demand_kW: raport.heat_demand.kW,
                building_type: raport.building_type,
                building_outline: raport.building_outline,
                building_area: raport.building_area,
                building_outline_m: raport.building_outline_m,
                building_outline_sizes: raport.building_outline_sizes,
                building_outline_length_m: raport.building_outline_length_m,
                building_outline_width_m: raport.building_outline_width_m,
                house_floor_plan: raport.house_floor_plan,
                house_roof_plan: raport.house_roof_plan,
                heating_levels: raport.heating_levels,
                building_has_basement: raport.building_has_basement,
                house_levels_height: raport.house_levels_height,
                building_has_taras: raport.building_has_taras,
                house_garage: raport.house_garage,
                building_construction_type: raport.building_construction_type,
                total_wall_thickness: raport.total_wall_thickness,
                basic_construction_material: raport.basic_construction_material,
                additional_construction_material: raport.additional_construction_material,
                wall_insulation: raport.wall_insulation,
                house_insulation: raport.house_insulation,
                outside_insulation: raport.outside_insulation,
                insulation_thickness: raport.insulation_thickness,
                windows_type: raport.windows_type,
                windows_number: raport.windows_number,
                taras_doors_number: raport.taras_doors_number,
                doors_type: raport.doors_type,
                large_glazings_number: raport.large_glazings_number,
                is_roof_isolation: raport.is_roof_isolation,
                isolation_roof_material: raport.isolation_roof_material,
                isolation_roof_thickness: raport.isolation_roof_thickness,
                is_parter_floor_isolation: raport.is_parter_floor_isolation,
                isolation_parter_floor_material: raport.isolation_parter_floor_material,
                isolation_parter_floor_thickness: raport.isolation_parter_floor_thickness,
                main_heat_sources: raport.main_heat_sources,
                temp_in_heat_rooms: raport.temp_in_heat_rooms,
                vent_type: raport.vent_type,
                heating_isolation_material: raport.heating_isolation_material,
                heating_isolation_material_thickness: raport.heating_isolation_material_thickness,
                type_of_heating_instalation: raport.type_of_heating_instalation,
                count_need_energy_cwu: raport.count_need_energy_cwu,
                hot_water_person_using: raport.hot_water_person_using,
                hot_water_using_style: raport.hot_water_using_style,
                hot_water_steroid_foto: raport.hot_water_steroid_foto,
                hot_water_steroid_kolektor: raport.hot_water_steroid_kolektor,
                rules1: raport.rules1,
                rules2: raport.rules2,
                send_raport_to_email: raport.send_raport_to_email,
                send_raport_to_near_companies: raport.send_raport_to_near_companies,
                send_raport_email: raport.send_raport_email,
                contact_phone_number: raport.contact_phone_number,
                contact_email_address: raport.contact_email_address,
                raport_url: raport.raport_url,
            }
        })
    
        return {
            response: true
        }
    }
    catch(error) {
        if (error instanceof Error){
            console.log("Error: ", error.stack)
            return {
                response: false
            }
        }
        else{
            return {
                response: false
            }
        }
    }
}