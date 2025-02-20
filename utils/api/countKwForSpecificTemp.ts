export const countKwForSpecificTemp = ({temp_outside, temp_inside_project, temp_outside_climate, power_kW}: {temp_outside: number, temp_inside_project: number, temp_outside_climate: number, power_kW: number}) => {
    let Pi: number = 0;

    Pi = (power_kW) * ((temp_inside_project - temp_outside) / (20 - temp_outside_climate)); 

    return Pi;
}