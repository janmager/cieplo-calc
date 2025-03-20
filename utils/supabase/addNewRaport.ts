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
                climate_zone: raport.climate_zone, 
                project_outside_temp: raport.project_outside_temp,
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
                wall_inside_insulation: raport.wall_inside_insulation,
                wall_insulation_thickness: raport.wall_insulation_thickness,
                house_insulation: raport.house_insulation,
                outside_insulation: raport.outside_insulation,
                insulation_thickness: raport.insulation_thickness,
                windows_type: raport.windows_type,
                windows_number: raport.windows_number,
                taras_doors_number: raport.taras_doors_number,
                doors_type: raport.doors_type,
                outside_doors_number: raport.outside_doors_number,
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
                max_temp_of_power_instalation: raport.max_temp_of_power_instalation,
                count_need_energy_cwu: raport.count_need_energy_cwu,
                hot_water_person_using: raport.hot_water_person_using,
                hot_water_using_style: raport.hot_water_using_style,
                hot_water_steroid_foto: raport.hot_water_steroid_foto,
                hot_water_steroid_kolektor: raport.hot_water_steroid_kolektor,
                rules1: raport.rules1,
                rules2: raport.rules2,
                send_raport_to_email: raport.send_raport_to_email,
                send_raport_to_near_companies: raport.send_raport_to_near_companies,
                send_raport_accept_24h: raport.send_raport_accept_24h,
                send_raport_email: raport.send_raport_email,
                contact_phone_number: raport.contact_phone_number,
                contact_email_address: raport.contact_email_address,
                raport_url: raport.raport_url,
                recommendedProducts: raport.recommendedProducts,

                whats_over: raport.whats_over,
                whats_under: raport.whats_under,
                whats_north: raport.whats_north,
                whats_south: raport.whats_south,
                whats_east: raport.whats_east,
                whats_west: raport.whats_west,
                on_corner: raport.on_corner,
                number_stairways: raport.number_stairways,
                number_elevators: raport.number_elevators,

                api_total_area: raport.api_total_area,
                api_heated_area: raport.api_heated_area,
                api_max_heating_power: raport.api_max_heating_power,
                api_avg_heating_power: raport.api_avg_heating_power,
                api_bivalent_point_heating_power: raport.api_bivalent_point_heating_power,
                api_hot_water_power: raport.api_hot_water_power,
                api_annual_energy_consumption: raport.api_annual_energy_consumption,
                api_annual_energy_consumption_factor: raport.api_annual_energy_consumption_factor,
                api_heating_power_factor: raport.api_heating_power_factor,
                api_design_outdoor_temperature: raport.api_design_outdoor_temperature,
                api_avg_outdoor_temperature: raport.api_avg_outdoor_temperature
            }
        })
    
        return {
            response: true
        }
    }
    catch(error) {
        console.log(error)
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