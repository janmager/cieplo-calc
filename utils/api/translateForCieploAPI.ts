import { mieszkanie_size } from './../../app/consts/mieszkanie_size';
import { whats_over } from '@/app/consts/whats_over';
import { apiDictionary } from "./apiDictionary";
import { levels } from '@/app/components/Calculator/2-screen/1-step/DynamicHouseSketch';

const translate = (value: any) => {
    let find: any = '';
    Object.keys(apiDictionary).map((v: string) => {
        if(v == value){
            find = apiDictionary[v]
        }
    })
    return find;
}

const isLastFloorHeated = (heating_levels: any, data: any) => {
    if(heating_levels.length){
        let is = false;
        heating_levels.map((lev: any) => {
            if(lev.indexOf(levels[data.house_floor_plan].counter) >= 0) is = true;
        })
        return is;
    }
    return true;
}

const translateHeatedFloors = (arr: string[], house_floor_plan: string) => {
    let out: Number[] = [];

    let dictionary: any = {
        'Piwnica' : 0,
        'Parter' : 1,
        '1. piętro' : 2,
        '2. piętro' : 3,
        '3. piętro' : 4,
        '4. piętro' : 5,
        '5. piętro' : 6,
        '6. piętro' : 7,
        '7. piętro' : 8,
        '8. piętro' : 9,
        '9. piętro' : 10,
        '10. piętro' : 11,
        '11. piętro' : 12,
        '12. piętro' : 13,
        'I poziom' : 1,
        'II poziom' : 2,
        'III poziom' : 3,
        'Poddasze' : house_floor_plan == 'Parterowy' ? 2 : house_floor_plan == 'Jednopiętrowy' ? 3 : house_floor_plan == 'Dwupiętrowy' ? 4 : house_floor_plan == 'Trzypiętrowy' ? 5 : house_floor_plan == 'Czteropiętrowy' ? 6 : house_floor_plan == 'Pięciopiętrowy' ? 7 : house_floor_plan == 'Sześciopiętrowy' ? 8 : house_floor_plan == 'Siedmiopiętrowy' ? 9 : house_floor_plan == 'Ośmiopiętrowy' ? 10 : house_floor_plan == 'Dziewięciopiętrowy' ? 11 : house_floor_plan == 'Dziesiąciopiętrowy' ? 12 : house_floor_plan == 'Jedenasopiętrowy' ? 13 : 14,
    }

    arr.map((i: string) => {
        out.push(dictionary[i])
    })

    out.sort((a, b) => a > b ? 1 : -1)

    return out;
}

export const translateForCieploAPI = (data: any) => {
    const output = {
        "building_type": translate(data.building_type),
        "construction_year": parseInt(translate(data.house_building_years)),
        "construction_type": translate(data.building_construction_type),
        "latitude": parseFloat(data.house_location.lat),
        "longitude": parseFloat(data.house_location.lng),
        ...data.building_type == 'Mieszkanie' && { "floor_area" : parseFloat(data.building_area)},
        "building_shape" : data.building_outline ? translate(data.building_outline) : 'regular',
        ...translate(data.building_outline) == 'regular' && data.building_area ? {
            "floor_area" : parseFloat(data.building_area),
        } : (data.building_outline_length_m && data.building_outline_width_m) ? {
            "building_length" : parseFloat(data.building_outline_length_m),
            "building_width" : parseFloat(data.building_outline_width_m)
        } : null,
        ...translate(data.building_outline) == 'irregular' && data.building_area && data.building_outline_m ? {
            "floor_area" : parseFloat(data.building_area),
            "floor_perimeter" : parseFloat(data.building_outline_m),
        } : null,
        "building_floors": data.building_type == 'Mieszkanie' ? parseInt(translate(data.mieszkanie_size)) : parseInt(translate(data.house_floor_plan)),
        "building_heated_floors": data.building_type == 'Mieszkanie' ? translateHeatedFloors(data.heating_levels_mieszkanie, data.mieszkanie_size) : translateHeatedFloors(data.heating_levels, data.house_floor_plan),
        "floor_height": parseFloat(translate(data.house_levels_height)),
        "building_roof": translate(data.house_roof_plan),
        "has_basement": data.building_has_basement,
        "has_balcony": data.building_has_taras,
        "garage_type": data.house_garage ? translate(data.house_garage) : 'none',
        "wall_size": parseInt(data.total_wall_thickness),
        ...translate(data.building_construction_type) == 'traditional' && {
            "primary_wall_material": parseInt(translate(data.basic_construction_material)),
            "secondary_wall_material": translate(data.additional_construction_material) != null ? parseInt(translate(data.additional_construction_material)) : null,
        },
        ...translate(data.building_construction_type) == 'canadian' || data.wall_insulation && {
            "internal_wall_isolation": {
                "material": parseInt(translate(data.wall_inside_insulation)),
                "size": parseInt(data.wall_insulation_thickness),
            },
        },
        ...data.house_insulation && {
            "external_wall_isolation": {
                "material": parseInt(translate(data.outside_insulation)),
                "size": parseInt(data.insulation_thickness)
            },
        },
        ...data.is_roof_isolation.indexOf('Tak') >= 0 && {
            "top_isolation": {
                "material": parseInt(translate(data.isolation_roof_material)),
                "size": parseInt(data.isolation_roof_thickness)
            },
        },
        ...data.is_parter_floor_isolation.indexOf('Tak') >= 0 && {
            "bottom_isolation": {
                "material": parseInt(translate(data.isolation_parter_floor_material)),
                "size": parseInt(data.isolation_parter_floor_thickness)
            },
        },
        ...((data.heating_levels.indexOf('Poddasze') == -1 && data.house_roof_plan.toLowerCase() == 'skośny z poddaszem') || (data.house_roof_plan.toLowerCase() != 'skośny z poddaszem' && !isLastFloorHeated(data.heating_levels, data))) && {
            "unheated_space_over_type": translate(data.unheated_space_type)
        },
        ...(data.heating_levels.indexOf('Piwnica') == -1 && data.building_has_basement) && {
            "unheated_space_under_type": translate(data.unheated_basement)
        },
        "number_doors": parseInt(data.outside_doors_number),
        "number_balcony_doors": parseInt(data.taras_doors_number),
        "number_windows": parseInt(data.windows_number),
        "number_huge_windows": parseInt(data.large_glazings_number),
        "doors_type": translate(data.doors_type),
        "windows_type": translate(data.windows_type),
        "indoor_temperature": parseFloat(data.temp_in_heat_rooms),
        "ventilation_type": translate(data.vent_type),
        "include_hot_water": data.count_need_energy_cwu,
        ...data.count_need_energy_cwu && {
            "hot_water_persons": parseInt(data.hot_water_person_using),
            "hot_water_usage": translate(data.hot_water_using_style),
        },
        ...translate(data.building_type) == 'apartment' && {
            "whats_over": translate(data.whats_over),
            "whats_under": translate(data.whats_under),
            "whats_north": translate(data.whats_north),
            "whats_south": translate(data.whats_south),
            "whats_east": translate(data.whats_east),
            "whats_west": translate(data.whats_west),
        },
        ...(translate(data.building_type) == 'apartment' && translate(data.whats_over) == 'unheated_room') && {
            "unheated_space_over_type" : translate(data.whats_over_situation)
        },
        ...(data.whats_over_is_strop_heated && translate(data.whats_over) != 'heated_room') && {
            "top_isolation": {
                "material": parseInt(translate(data.whats_over_strop_isolation_material)),
                "size": parseInt(data.whats_over_strop_isolation_thickness)
            },
        },
        ...(translate(data.building_type) == 'apartment' && translate(data.whats_under) == 'unheated_room') && {
            "unheated_space_under_type" : translate(data.whats_under_situation)
        },
        ...(data.whats_under_is_strop_heated && translate(data.whats_under) != 'heated_room') && {
            "bottom_isolation": {
                "material": parseInt(translate(data.whats_under_floor_isolation_material)),
                "size": parseInt(data.whats_under_floor_isolation_thickness)
            },
        },
        ...translate(data.building_type) == 'row_house' && {
            "on_corner": data.on_corner,
        },
        ...translate(data.building_type) == 'multifamily' && {
            "number_stairways" : parseInt(data.number_stairways),
            "number_elevators" : parseInt(data.number_elevators),
        },
    }

    console.log(output);

    return output;
}